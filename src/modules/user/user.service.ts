import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EditUserPayload } from './payload';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async editUser(userId: number, payload: EditUserPayload) {
    const user = await this.userModel.updateOne({ _id: userId }, payload);
    return user;
  }
}
