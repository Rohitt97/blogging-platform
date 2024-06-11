import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blog-post-schema';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-Blog.dto';
import { UpdateBlogDto } from './dto/update-blog-dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll() {
    return await this.blogModel.find().populate(['author']);
  }

  async findOne(filterOptions: any) {
    return (await this.blogModel.findOne(filterOptions)).populate(['author']);
  }

  async createBlog(blogData: CreateBlogDto) {
    const blog = new this.blogModel(blogData);
    return await blog.save();
  }

  async updateBlog(filterOptions: any, blogData: UpdateBlogDto) {
    return this.blogModel.findOneAndUpdate(filterOptions, blogData, {
      new: true,
    });
  }

  async deleteBlog(filterOptions: any) {
    const deletedBlog = await this.blogModel.deleteOne(filterOptions);
    if (deletedBlog.deletedCount >= 1) {
      return { message: 'Blog Deleted Successfully' };
    }
    return { message: 'Something Went Wrong' };
  }
}
