import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPostDto } from './dto/blog-post-dto';
import { UpdateBlogDto } from './dto/update-blog-dto';
import { JwtAuthGuard } from 'src/@globals/guard/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('/')
  async findAll() {
    return await this.blogService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') blogId: string) {
    return await this.blogService.findOne({ _id: blogId });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createBlog(@Body() blogData: BlogPostDto, @Request() req) {
    return await this.blogService.createBlog({
      ...blogData,
      author: req.user._id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateBlog(
    @Body() updatedData: UpdateBlogDto,
    @Param('id') blogId: string,
  ) {
    return await this.blogService.updateBlog(
      {
        _id: blogId,
      },
      updatedData,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteBlog(@Param('id') blogId: string) {
    return await this.blogService.deleteBlog({ _id: blogId });
  }
}
