import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from 'src/modules/config/config.service';
import { IUser } from 'src/modules/user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('WEBTOKEN_SECRET_KEY'),
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.userModel.findById(payload.sub);
    return user;
  }
}
