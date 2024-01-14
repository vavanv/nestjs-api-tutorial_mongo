import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: User }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
