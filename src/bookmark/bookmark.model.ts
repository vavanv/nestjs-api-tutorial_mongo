import { Schema, Document } from 'mongoose';
import { IUser } from 'src/user/user.model';

export interface IBookmark extends Document {
  title: string;
  description: string;
  link: string;
  user: IUser;
}

export const Bookmark = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    link: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
