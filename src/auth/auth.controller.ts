import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /*
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req){
    return this.authService.login(req.user)
  }
  */

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res({passthrough:true}) res:Response){
    const { accessToken } = await this.authService.login(req.user)
    res.cookie('access_token', accessToken, {
      httpOnly:true
    })
    return {message: "Successfully logged in"}
  }
}
