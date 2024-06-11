import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';

@Injectable()
export class UpdateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
