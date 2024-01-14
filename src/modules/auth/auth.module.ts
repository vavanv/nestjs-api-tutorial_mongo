import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from 'src/modules/user/user.model';
import { ConfigModule } from 'src/modules/config/config.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { ConfigService } from 'src/modules/config/config.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('WEBTOKEN_SECRET_KEY'),
          signOptions: {
            ...(configService.get('WEBTOKEN_EXPIRATION_TIME')
              ? {
                  expiresIn: Number(
                    configService.get('WEBTOKEN_EXPIRATION_TIME'),
                  ),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: User }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
