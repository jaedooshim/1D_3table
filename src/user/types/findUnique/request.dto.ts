import { IsNotEmpty, IsString } from 'class-validator';

export class UserFindUniqueParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
