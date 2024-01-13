import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthPayload } from 'src/auth/payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() payload: AuthPayload) {
    return this.authService.signup(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() payload: AuthPayload) {
    return this.authService.signin(payload);
  }
}
