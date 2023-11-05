import { Controller, Post, Body, Param, Get, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
  async addToCart(
    @Body('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
    @Res() res: Response,
  ) {
    const result = await this.cartService.addToCart(
      userId,
      productId,
      quantity,
    );
    res.status(result.status).send(result.data);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: number, @Res() res: Response) {
    const result = await this.cartService.getCartByUserId(userId);
    res.status(result.status).send(result.data);
  }

  @Post('buy/:userId')
  async buyCart(@Param('userId') userId: number, @Res() res: Response) {
    const result = await this.cartService.buyCart(userId);
    res.status(result.status).send(result.data);
  }
}
