import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EditUserPayload } from './payload';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async editUser(userId: number, payload: EditUserPayload) {
    await this.userModel.updateOne({ _id: userId }, payload);
    return this.userModel.findById(userId);
  }

  async deleteUserById(userId: string) {
    const bookmark = await this.userModel.findOne({
      _id: userId,
    });
    if (!bookmark) {
      throw new NotFoundException(
        'Resource not found or access to resource denied',
      );
    }
    await this.userModel.deleteOne({ _id: userId });
  }
}
