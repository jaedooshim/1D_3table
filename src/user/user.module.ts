import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { BcryptModule } from '../_common/bcrypt/bcrypt.module';

@Module({
  imports: [PrismaModule, BcryptModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
