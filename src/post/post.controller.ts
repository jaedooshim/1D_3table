import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './types/create/request.dto';
import { PostParamDto, PostUpdateDto } from './types/update/request.dto';
import { PostFindManyDto } from './types/findMany/request.dto';
import { CommentCreateDto } from './comment/create/request.dto';
import { CommentService } from './comment/comment.service';
import { CommentParamDto, CommentUpdateDto } from './comment/update/request.dto';
import { CommentFindManyDto } from './comment/findMany/request.dto';

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @Post()
  async create(@Body() body: PostCreateDto, @Body('userId') userId: string): Promise<string> {
    return await this.postService.create(body, userId);
  }

  @Put('/:postId')
  async update(@Body() body: PostUpdateDto, @Body('userId') userId: string, @Param() param: PostParamDto) {
    return await this.postService.update(body, userId, param.postId);
  }

  @Delete('/:postId')
  async delete(@Body('userId') userId: string, @Param() param: PostParamDto) {
    return await this.postService.delete(param.postId, userId);
  }

  @Get('/comments')
  async findManyComment(@Query() query: CommentFindManyDto) {
    return await this.commentService.findMany(query);
  }

  @Get('/:postId')
  async findUnique(@Param() param: PostParamDto) {
    return await this.postService.findUnique(param.postId);
  }

  @Get()
  async findMany(@Query() query: PostFindManyDto) {
    return await this.postService.findMany(query);
  }

  @Post('/:postId/comments')
  async createComment(@Body() body: CommentCreateDto, @Param('postId') postId: number, @Body('userId') userId: string): Promise<string> {
    return await this.postService.createComment(body, postId, userId);
  }

  @Patch('/:postId/comments/:commentId')
  async updateComment(@Body() body: CommentUpdateDto, @Param() param: CommentParamDto): Promise<string> {
    return await this.postService.updateComment(param.postId, param.commentId, body);
  }

  @Delete('/:postId/comments/:commentId')
  async deleteComment(@Param() param: CommentParamDto, @Body('userId') userId: string): Promise<string> {
    return await this.postService.deleteComment(param.postId, param.commentId, userId);
  }
}
