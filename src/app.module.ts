import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BcryptModule } from './_common/bcrypt/bcrypt.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './post/comment/comment.module';

@Module({
  imports: [UserModule, PrismaModule, BcryptModule, PostModule, CommentModule],
})
export class AppModule {}
