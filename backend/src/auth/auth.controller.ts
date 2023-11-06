import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.validateUser(username, password);

    if (!result.sub) {
      res.status(result.status).send(result.data);
    }
    const token = await this.authService.login(result);
    res.status(token.status).json(token.JSON);
  }

  @Post('register')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.createUser(username, password);
    res.status(result.status).send(result.data);
  }
}
