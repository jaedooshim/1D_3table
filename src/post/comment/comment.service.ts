import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { UserService } from '../../user/user.service';
import { ICommentCreate } from './create/request.interface';
import { Comment } from '@prisma/client';
import { ICommentUpdate } from './update/request.interface';
import { ICommentFindMany } from './findMany/request.interface';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userService: UserService,
  ) {}

  async create(data: ICommentCreate, postId: number, userId: string): Promise<string> {
    await this.userService.findUnique(userId);
    await this.commentRepository.create(data, postId, userId);
    return '댓글이 생성되었습니다.';
  }

  async update(id: number, data: ICommentUpdate): Promise<string> {
    await this.userService.findUnique(data.userId);
    await this.findUniqueOrThrow(id);
    await this.commentRepository.update(id, data);
    return '댓글이 수정되었습니다.';
  }

  async softDelete(id: number): Promise<string> {
    await this.findUniqueOrThrow(id);
    await this.commentRepository.delete(id);
    return '댓글이 삭제되었습니다.';
  }

  async findUniqueOrThrow(id: number): Promise<Comment> {
    return await this.commentRepository.findUnique(id);
  }

  async findMany(data: ICommentFindMany) {
    return await this.commentRepository.findMany(data);
  }
}
