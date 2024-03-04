import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(10)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  @MinLength(8)
  // @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  @Matches(/[ㄱ-힣]/)
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subAddress: string;
}
