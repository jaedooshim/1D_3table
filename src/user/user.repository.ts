import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUserCreate } from './types/create/request.interface';
import { User } from '@prisma/client';
import { IUserUpdate } from './types/update/request.interface';
import { IUserFindMany } from './types/findMany/request.interface';
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  private userRepository = this.prisma.extendedClient.user;

  async create(data: IUserCreate): Promise<User> {
    return this.userRepository.create({ data: { ...data } });
  }

  async update(id: string, data: IUserUpdate): Promise<User> {
    return this.userRepository.update({ where: { id }, data: { ...data } });
  }

  async delete(id: string): Promise<User> {
    return this.userRepository.softDelete({ id });
  }

  async findUnique(id: string): Promise<User> {
    return this.userRepository.findUnique({ where: { id } });
  }

  async findMany(data: IUserFindMany): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
    return user;
  }

  async findFirstByEmail(email: string): Promise<User> {
    const existEmail = await this.userRepository.findFirst({ where: { email } });
    if (existEmail) throw new ConflictException('이미 등록된 이메일입니다.');
    return existEmail;
  }

  async findUniqueOrThrow(id: string): Promise<User> {
    const existUser = await this.userRepository.findUnique({ where: { id } });
    if (!existUser) throw new NotFoundException('해당하는 유저가 존재하지 않습니다.');
    return existUser;
  }
}
