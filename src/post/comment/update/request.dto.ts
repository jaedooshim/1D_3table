import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class CommentParamDto {
  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}
