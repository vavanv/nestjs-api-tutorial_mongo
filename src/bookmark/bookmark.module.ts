import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark } from './bookmark.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bookmark', schema: Bookmark }]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
