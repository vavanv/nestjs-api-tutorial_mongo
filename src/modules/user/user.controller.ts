import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from 'src/modules/auth/decorator';
import { JwtGuard } from 'src/modules/auth/guard';

import { EditUserPayload } from './payload';
import { UserService } from './user.service';
import { IUser } from './user.model';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: IUser) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() payload: EditUserPayload) {
    return this.userService.editUser(userId, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUserById(@GetUser('id') userId: string) {
    return this.userService.deleteUserById(userId);
  }
}
