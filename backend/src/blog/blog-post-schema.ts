import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user-schema';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: User;
}

const BlogSchema = SchemaFactory.createForClass(Blog);
export { BlogSchema };
