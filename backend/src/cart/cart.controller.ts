import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Req() req,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
    @Res() res: Response,
  ) {
    const result = await this.cartService.addToCart(
      req.user.userId,
      productId,
      quantity,
    );
    res.status(result.status).send(result.data);
  }

  @Post('remove-from-cart')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @Req() req,
    @Body('productId') productId: number,
    @Res() res: Response,
  ) {
    const result = await this.cartService.removeFromCart(
      req.user.userId,
      productId,
    );
    res.status(result.status).send(result.data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserCart(@Req() req, @Res() res: Response) {
    const result = await this.cartService.getCartByUserId(req.user.userId);
    res.status(result.status).send(result.data);
  }

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  async buyCart(@Req() req, @Res() res: Response) {
    const result = await this.cartService.buyCart(req.user.userId);
    res.status(result.status).send(result.data);
  }
}
