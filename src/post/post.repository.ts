import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IPostCreate } from './types/create/request.interface';
import { Post } from '@prisma/client';
import { IPostUpdate } from './types/update/request.interface';
import { IPostFindMany } from './types/findMany/request.interface';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  private postRepository = this.prisma.extendedClient.post;

  async create(data: IPostCreate, userId: string): Promise<Post> {
    return this.postRepository.create({ data: { ...data, userId } });
  }

  async update(id: number, data: IPostUpdate): Promise<Post> {
    return this.postRepository.update({ where: { id }, data: { ...data } });
  }

  async delete(id: number): Promise<Post> {
    return this.postRepository.softDelete({ id });
  }

  async findUnique(id: number): Promise<Post> {
    return this.postRepository.findFirst({ where: { id } });
  }

  async findMany(data: IPostFindMany): Promise<Post[]> {
    const post = await this.prisma.post.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'asc',
      },
    });
    return post;
  }

  async findUniqueOrThrow(id: number): Promise<Post> {
    console.log('id', id);
    const isValidPost = await this.postRepository.findUnique({ where: { id } });
    if (!isValidPost) throw new NotFoundException('존재하지 않는 게시글입니다.');
    return isValidPost;
  }
}
