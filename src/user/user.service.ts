import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUserCreate } from './types/create/request.interface';
import { User } from '@prisma/client';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';
import { IUserUpdate } from './types/update/request.interface';
import { IUserFindMany } from './types/findMany/request.interface';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: IUserCreate): Promise<User> {
    await this.userRepository.findFirstByEmail(data.email);
    data.password = await this.bcryptService.hash(data.password);
    return await this.userRepository.create(data);
  }

  async update(id: string, data: IUserUpdate): Promise<User> {
    await this.userRepository.findUniqueOrThrow(id);
    await this.userRepository.findFirstByEmail(data.email);
    data.password = await this.bcryptService.hash(data.password);
    return await this.userRepository.update(id, data);
  }

  async softDelete(id: string): Promise<User> {
    await this.userRepository.findUniqueOrThrow(id);
    return await this.userRepository.delete(id);
  }

  async findUnique(id: string): Promise<User> {
    await this.userRepository.findUniqueOrThrow(id);
    return await this.userRepository.findUnique(id);
  }

  async findMany(data: IUserFindMany) {
    return await this.userRepository.findMany(data);
  }
}
