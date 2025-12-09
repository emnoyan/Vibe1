import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PostsModule } from './posts/posts.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { InvoicesModule } from './invoices/invoices.module.js';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import { DbI18nLoader } from './i18n/db-i18n.loader.js';
import { TestI18nController } from './test-i18n.controller.js';
import { I18nController } from './i18n/i18n.controller.js';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    InvoicesModule,
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {},
      }),
      loader: DbI18nLoader,
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-custom-lang']),
      ],
    }),
  ],
  controllers: [AppController, TestI18nController, I18nController],
  providers: [AppService, DbI18nLoader],
})
export class AppModule { }
