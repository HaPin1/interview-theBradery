// cart.controller.ts

import {
  Controller,
  Post,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':clientId')
  async getCart(@Param('clientId') clientId: number): Promise<Cart> {
    const cart = await this.cartService.getCartByClientId(clientId);

    if (!cart) {
      throw new NotFoundException('Panier non trouvé pour ce client');
    }

    return cart;
  }

  @Post(':clientId/add/:productId')
  async addToCart(
    @Param('clientId') clientId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.addToCart(clientId, productId);
  }

  @Post('buy/:clientId')
  async buyItems(@Param('clientId') clientId: number): Promise<string> {
    const result = await this.cartService.buyItems(clientId);

    if (result === 'NotEnoughStock') {
      throw new Error(
        'Achat impossible : Stock insuffisant pour certains produits',
      );
    }

    if (result === 'CartEmpty') {
      throw new NotFoundException('Le panier est vide');
    }

    return 'Achat effectué avec succès';
  }
}
