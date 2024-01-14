import { Schema, Document } from 'mongoose';

import { IBookmark } from 'src/modules/bookmark/bookmark.model';

export interface IUser extends Document {
  readonly _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bookmarks: [IBookmark];
}

export const User = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bookmark',
      },
    ],
  },
  {
    timestamps: true,
  },
);
