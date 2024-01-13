import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { AuthPayload } from 'src/auth/payload';
import { IUser } from 'src/user/user.model';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(payload: AuthPayload) {
    const hash = await argon.hash(payload.password);
    try {
      const newUser = {
        email: payload.email,
        password: hash,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
      const user = await this.userModel.create(newUser);

      return this.signToken(user);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new ForbiddenException('Email mast be unique');
      }
      throw error;
    }
  }

  async signin(payload: AuthPayload) {
    const user = await this.userModel.findOne({
      email: payload.email,
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const pwMatches = await argon.verify(user.password, payload.password);
    if (!pwMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.signToken(user);
  }

  async signToken(user: IUser): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}