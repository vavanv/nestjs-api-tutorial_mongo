import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBookmarkPayload, EditBookmarkPayload } from './payload';
import { IBookmark } from './bookmark.model';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel('Bookmark') private readonly bookmarkModel: Model<IBookmark>,
  ) {}
  async getBookmarks(userId: string): Promise<IBookmark[]> {
    return await this.bookmarkModel.find({ user: userId });
  }

  async getBookmarkById(
    userId: string,
    bookmarkId: string,
  ): Promise<IBookmark> {
    return await this.bookmarkModel.findById({ _id: bookmarkId, user: userId });
  }

  async createBookmark(userId: string, payload: CreateBookmarkPayload) {
    const newBookmark = {
      title: payload.title,
      description: payload.description,
      link: payload.link,
      user: userId,
    };
    const bookmark = await this.bookmarkModel.create(newBookmark);
    return bookmark;
  }

  async editBookmarkById(
    userId: string,
    bookmarkId: string,
    payload: EditBookmarkPayload,
  ) {
    const bookmark = await this.bookmarkModel.findOne({
      _id: bookmarkId,
      user: userId,
    });
    if (!bookmark) {
      throw new NotFoundException(
        'Resource not found or access to resource denied',
      );
    }
    return this.bookmarkModel.updateOne({ _id: bookmarkId }, payload);
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    const bookmark = await this.bookmarkModel.findOne({
      _id: bookmarkId,
      user: userId,
    });
    if (!bookmark) {
      throw new NotFoundException(
        'Resource not found or access to resource denied',
      );
    }
    await this.bookmarkModel.deleteOne({ _id: bookmarkId });
  }
}
