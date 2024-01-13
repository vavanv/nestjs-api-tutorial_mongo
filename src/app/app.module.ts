import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          uri: configService.get('DATABASE_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }) as MongooseModuleFactoryOptions,
    }),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    ConfigModule,
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
})
export class AppModule {}
