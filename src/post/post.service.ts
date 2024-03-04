import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { IPostCreate } from './types/create/request.interface';
import { Post } from '@prisma/client';
import { UserService } from '../user/user.service';
import { IPostUpdate } from './types/update/request.interface';
import { IPostFindMany } from './types/findMany/request.interface';
import { CommentService } from './comment/comment.service';
import { ICommentCreate } from './comment/create/request.interface';
import { ICommentUpdate } from './comment/update/request.interface';
import { CommentRepository } from './comment/comment.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  async create(data: IPostCreate, userId: string): Promise<string> {
    await this.userService.findUnique(userId);
    await this.postRepository.create(data, userId);
    return '게시글이 작성되었습니다.';
  }

  async createComment(data: ICommentCreate, postId: number, userId: string): Promise<string> {
    await this.userService.findUnique(userId);
    await this.findUnique(postId);
    await this.commentService.create(data, postId, userId);
    return '댓글이 생성되었습니다.';
  }

  async update(data: IPostUpdate, userId: string, id: number): Promise<string> {
    await this.userService.findUnique(userId);
    const post = await this.postRepository.findUniqueOrThrow(id);
    await this.verifyAuthorityOrThrow(post.userId, userId);
    await this.postRepository.update(id, data);
    return '게시글이 수정되었습니다.';
  }

  async updateComment(id: number, commentId: number, data: ICommentUpdate): Promise<string> {
    await this.postRepository.findUniqueOrThrow(id);
    const comment = await this.commentService.findUniqueOrThrow(commentId);
    await this.verifyAuthorityOrThrow(comment.userId, data.userId);
    await this.commentService.update(commentId, data);
    return '댓글이 수정되었습니다.';
  }

  async delete(id: number, userId: string): Promise<string> {
    await this.userService.findUnique(userId);
    const post = await this.postRepository.findUniqueOrThrow(id);
    await this.verifyAuthorityOrThrow(post.userId, userId);
    await this.postRepository.delete(id);
    return '게시글이 삭제되었습니다.';
  }

  async deleteComment(id: number, commentId: number, userId: string): Promise<string> {
    console.log('id', id);
    console.log('commentId', commentId);
    await this.postRepository.findUniqueOrThrow(id);
    const comment = await this.commentService.findUniqueOrThrow(commentId);
    await this.verifyAuthorityOrThrow(comment.userId, userId);
    await this.commentService.softDelete(commentId);
    return '댓글이 삭제되었습니다.';
  }

  async findUnique(id: number): Promise<Post> {
    await this.postRepository.findUniqueOrThrow(id);
    return await this.postRepository.findUnique(id);
  }

  async findMany(data: IPostFindMany) {
    return await this.postRepository.findMany(data);
  }

  async verifyAuthorityOrThrow(userId: string, postUserId: string): Promise<void> {
    if (userId !== postUserId) throw new ForbiddenException('게시글에 대한 권한이 없습니다.');
  }
}
