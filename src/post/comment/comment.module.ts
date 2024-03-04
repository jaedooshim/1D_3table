import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommentRepository } from './comment.repository';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
