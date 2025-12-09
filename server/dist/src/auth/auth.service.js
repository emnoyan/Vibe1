"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_js_1 = require("../users/users.service.js");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const nestjs_i18n_1 = require("nestjs-i18n");
let AuthService = AuthService_1 = class AuthService {
    usersService;
    jwtService;
    i18n;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(usersService, jwtService, i18n) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.i18n = i18n;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOneByEmail(email);
        const i18nContext = nestjs_i18n_1.I18nContext.current();
        this.logger.log(`Validating user. Current Language: ${i18nContext?.lang}`);
        if (user && user.status === 'INACTIVE') {
            const msg = i18nContext?.t('AUTH_ACCOUNT_INACTIVE');
            this.logger.log(`Inactive account message (${i18nContext?.lang}): ${msg}`);
            throw new common_1.UnauthorizedException(msg);
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
            throw new common_1.ForbiddenException(nestjs_i18n_1.I18nContext.current()?.t('AUTH_ACCESS_DENIED'));
        const rtMatches = await bcrypt.compare(rt, user.hashedRefreshToken);
        if (!rtMatches)
            throw new common_1.ForbiddenException(nestjs_i18n_1.I18nContext.current()?.t('AUTH_ACCESS_DENIED'));
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
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_js_1.UsersService,
        jwt_1.JwtService,
        nestjs_i18n_1.I18nService])
], AuthService);
//# sourceMappingURL=auth.service.js.map