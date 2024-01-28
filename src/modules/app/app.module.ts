import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { BookmarkModule } from '../bookmark/bookmark.module';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: process.env.DATABASE_URL,
    //   }),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
})
export class AppModule {}
