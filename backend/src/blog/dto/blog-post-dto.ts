import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';

@Injectable()
export class BlogPostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
