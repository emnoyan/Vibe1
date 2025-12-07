import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CaslModule } from '../casl/casl.module.js';

@Module({
  imports: [PrismaModule, CaslModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
