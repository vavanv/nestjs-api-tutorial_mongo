import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
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
}
