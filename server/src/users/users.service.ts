import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity.js';
import { Prisma } from 'generated/prisma/client';
import { removeAccents } from '../common/utils/string.utils.js';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly i18n: I18nService
  ) { }

  async onModuleInit() {
    // Refresh searchText for all users to ensure new accent removal logic (e.g. Đ -> d) is applied
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, searchText: true },
    });

    for (const user of users) {
      const newSearchText = removeAccents((user.name || '') + ' ' + user.email);
      if (user.searchText !== newSearchText) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { searchText: newSearchText },
        });
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const searchText = removeAccents((createUserDto.name || '') + ' ' + createUserDto.email);
    try {
      return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          searchText,
        },
        include: {
          managedCategories: true
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(I18nContext.current()?.t('USER_EMAIL_EXISTS'));
      }
      throw error;
    }
  }

  async findAll(params?: {
    q?: string;
    role?: Prisma.EnumRoleFilter | 'ADMIN' | 'USER';
    status?: Prisma.EnumUserStatusFilter | 'ACTIVE' | 'INACTIVE';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const { q, role, status, sortBy, sortOrder } = params || {};

    // Normalize query
    const normalizedQ = q ? removeAccents(q) : undefined;

    const where: Prisma.UserWhereInput = {
      AND: [
        normalizedQ ? {
          searchText: { contains: normalizedQ, mode: 'insensitive' },
        } : {},
        role ? { role: role as any } : {},
        status ? { status: status as any } : {},
      ],
    };

    const orderBy: Prisma.UserOrderByWithRelationInput = sortBy ? {
      [sortBy]: sortOrder || 'asc',
    } : { id: 'asc' };

    const users = await this.prisma.user.findMany({
      where,
      orderBy,
      include: {
        managedCategories: true,
      },
    });
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { managedCategories: true }
    });
    if (user) {
      return new UserEntity(user);
    }
    return null;
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { managedCategories: true }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // If password is provided but empty, remove it to prevent overwriting with empty string
    if (updateUserDto.password === '' || updateUserDto.password === undefined || updateUserDto.password === null) {
      delete updateUserDto.password;
    }

    // If password is provided and not empty, hash it
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    // Update searchText if name or email is changing, or both
    // However, updateDto is partial. We need current data to reconstruct full searchText IF we want to keep it sync.
    // Or we can just fetch current user first?
    // Optimization: If name or email is provided, fetch current, merge, update searchText.
    let searchText: string | undefined;
    if (updateUserDto.name !== undefined || updateUserDto.email !== undefined) {
      const currentUser = await this.prisma.user.findUnique({ where: { id } });
      if (currentUser) {
        const newName = updateUserDto.name !== undefined ? updateUserDto.name : currentUser.name;
        const newEmail = updateUserDto.email !== undefined ? updateUserDto.email : currentUser.email;
        searchText = removeAccents((newName || '') + ' ' + newEmail);
        // Force update searchText
      }
    }

    const { managedCategoryIds, ...userData } = updateUserDto;

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          ...(searchText ? { searchText } : {}),
          ...(managedCategoryIds ? {
            managedCategories: {
              set: managedCategoryIds.map(id => ({ id }))
            }
          } : {}),
        },
        include: {
          managedCategories: true
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(I18nContext.current()?.t('USER_EMAIL_EXISTS'));
      }
      throw error;
    }
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  removeMany(ids: number[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async getStats() {
    const total = await this.prisma.user.count();
    const active = await this.prisma.user.count({ where: { status: 'ACTIVE' } });
    const inactive = await this.prisma.user.count({ where: { status: 'INACTIVE' } });
    const admin = await this.prisma.user.count({ where: { role: 'ADMIN' } });
    const user = await this.prisma.user.count({ where: { role: 'USER' } });

    return {
      total,
      active,
      inactive,
      admin,
      user,
    };
  }

  async updateRefreshToken(id: number, hashedRefreshToken: string | null) {
    return this.prisma.user.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }
}
