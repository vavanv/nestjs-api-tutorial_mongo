import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthSignupPayload, AuthSigninPayload } from 'src/modules/auth/payload';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() payload: AuthSignupPayload) {
    return this.authService.signup(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() payload: AuthSigninPayload) {
    return this.authService.signin(payload);
  }
}
