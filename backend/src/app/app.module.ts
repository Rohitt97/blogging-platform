import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BlogModule } from '../blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    BlogModule,

    MongooseModule.forRoot(
      'mongodb+srv://rohitkumawat:1234@cluster0.xc60sdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
})
export class AppModule {}
