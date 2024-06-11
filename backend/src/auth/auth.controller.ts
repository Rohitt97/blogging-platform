import {
  BadRequestException,
  ConflictException,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dtos/signin-dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly userService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('/signup')
  async signup(@Body() userData: CreateUserDto) {
    const { email } = userData;
    const [user] = await this.userService.find({ email });

    if (user) {
      throw new ConflictException('Email already exist ');
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      parseInt(this.configService.get('JWT_SALT_ROUNDS')),
    );

    const newUser = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });
    const accessToken = this.jwtService.sign({
      sub: newUser._id,
      email: newUser.email,
    });

    return await this.userService.saveToken(newUser._id, accessToken);
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto) {
    const { email, password } = signinDto;
    const [userDetail] = await this.userService.find({ email });

    if (!userDetail) {
      throw new NotFoundException('User Not Found with this email.');
    }
    if (await bcrypt.compare(password, userDetail.password)) {
      const accessToken = this.jwtService.sign({
        sub: userDetail._id,
        email: userDetail.email,
      });
      return await this.userService.saveToken(userDetail._id, accessToken);
    }

    throw new BadRequestException('User password does not match');
  }
}
