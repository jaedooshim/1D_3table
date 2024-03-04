import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICommentCreate } from './create/request.interface';
import { Comment } from '@prisma/client';
import { ICommentUpdate } from './update/request.interface';
import { ICommentFindMany } from './findMany/request.interface';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  private commentRepository = this.prisma.extendedClient.comment;

  async create(data: ICommentCreate, postId: number, userId: string): Promise<Comment> {
    return this.commentRepository.create({ data: { ...data, postId, userId } });
  }

  async update(id: number, { userId, ...data }: ICommentUpdate): Promise<Comment> {
    return this.commentRepository.update({ where: { id }, data: { ...data, userId } });
  }

  async findUnique(id: number): Promise<Comment | null> {
    const comment = await this.commentRepository.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('해당하는 댓글이 존재하지 않습니다.');
    return comment;
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.softDelete({ id });
  }

  async findMany(data: ICommentFindMany): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'asc',
      },
    });
    return comments;
  }
}
