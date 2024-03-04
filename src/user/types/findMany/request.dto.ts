import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;
  @IsNotEmpty()
  @IsNumber()
  page: number;
}
