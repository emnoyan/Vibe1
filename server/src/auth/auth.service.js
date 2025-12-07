var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
let AuthService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AuthService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService;
        jwtService;
        constructor(usersService, jwtService) {
            this.usersService = usersService;
            this.jwtService = jwtService;
        }
        async validateUser(email, pass) {
            const user = await this.usersService.findOneByEmail(email);
            if (user && user.status === 'INACTIVE') {
                throw new UnauthorizedException('Your account is inactive. Please contact administrator.');
            }
            if (user && (await bcrypt.compare(pass, user.password))) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        async login(user) {
            const tokens = await this.getTokens(user.id, user.email, user.role, user.managedCategories);
            await this.updateRefreshToken(user.id, tokens.refresh_token);
            return {
                ...tokens,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    status: user.status,
                    managedCategories: user.managedCategories
                }
            };
        }
        async register(createUserDto) {
            const user = await this.usersService.create(createUserDto);
            return this.login(user);
        }
        async logout(userId) {
            return this.usersService.updateRefreshToken(userId, null);
        }
        async refreshTokens(userId, rt) {
            const user = await this.usersService.findOne(userId);
            if (!user || !user.hashedRefreshToken)
                throw new ForbiddenException('Access Denied');
            const rtMatches = await bcrypt.compare(rt, user.hashedRefreshToken);
            if (!rtMatches)
                throw new ForbiddenException('Access Denied');
            const tokens = await this.getTokens(user.id, user.email, user.role, user.managedCategories);
            await this.updateRefreshToken(user.id, tokens.refresh_token);
            return tokens;
        }
        async updateRefreshToken(userId, refreshToken) {
            const hash = await bcrypt.hash(refreshToken, 10);
            await this.usersService.updateRefreshToken(userId, hash);
        }
        async getTokens(userId, email, role, managedCategories = []) {
            const managedCategoryIds = managedCategories ? managedCategories.map(c => c.id) : [];
            const payload = { sub: userId, email, role, managedCategoryIds };
            const [at, rt] = await Promise.all([
                this.jwtService.signAsync(payload, { expiresIn: '15m' }),
                this.jwtService.signAsync(payload, { expiresIn: '7d' }),
            ]);
            return {
                access_token: at,
                refresh_token: rt,
            };
        }
    };
    return AuthService = _classThis;
})();
export { AuthService };
