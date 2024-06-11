import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';

@Injectable()
export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;
}
