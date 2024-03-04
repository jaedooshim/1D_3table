import { IsNotEmpty, IsString } from 'class-validator';

export class UserDeleteParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
