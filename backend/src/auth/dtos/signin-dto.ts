import { Injectable } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';

@Injectable()
export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
