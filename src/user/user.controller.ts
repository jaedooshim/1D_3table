import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './types/create/request.dto';
import { User } from '@prisma/client';
import { UserUpdateDto, UserUpdateParamDto } from './types/update/request.dto';
import { UserDeleteParamDto } from './types/delete/request.dto';
import { UserFindUniqueParamDto } from './types/findUnique/request.dto';
import { UserFindManyDto } from './types/findMany/request.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    return await this.userService.create(body);
  }

  @Put('/:id')
  async update(@Body() body: UserUpdateDto, @Param() param: UserUpdateParamDto): Promise<User> {
    return await this.userService.update(param.id, body);
  }

  @Delete('/:id')
  async softDelete(@Param() param: UserDeleteParamDto): Promise<User> {
    return await this.userService.softDelete(param.id);
  }

  @Get('/:id')
  async findUnique(@Param() param: UserFindUniqueParamDto): Promise<User> {
    return await this.userService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: UserFindManyDto) {
    return await this.userService.findMany(query);
  }
}
