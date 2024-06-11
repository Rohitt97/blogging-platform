import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user-schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user-dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async validateUser(email: string, password: string) {
    const [user] = await this.find({ email });
    if (!user) throw new NotFoundException('Email is not exist'); // if user not found the return null value
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new BadRequestException('userPassword does not match');
  }

  async find(filterOptions: any) {
    return await this.userModel.find(filterOptions);
  }

  async createUser(userData: CreateUserDto) {
    const user = new this.userModel(userData);
    return await user.save();
  }

  async saveToken(id: string, accessToken: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        accessToken,
      },
      {
        new: true,
      },
    );
    return user;
  }
}
