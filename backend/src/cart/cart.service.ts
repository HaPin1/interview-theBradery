import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Products } from 'src/products/products.entity';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: 'Product not found',
      };
    }

    if (product.inventory < quantity) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: 'Not enough inventory for this product',
      };
    }

    let cartItem = await this.cartRepository.findOne({
      where: { userId, product: { id: productId } },
    });

    if (!cartItem) {
      cartItem = new Cart();
      cartItem.userId = userId;
      cartItem.product = { id: productId } as any;
      cartItem.quantity = quantity;
    } else {
      cartItem.quantity += quantity;
    }

    await this.cartRepository.save(cartItem);
    return {
      status: HttpStatus.OK,
      data: 'Product added to cart',
    };
  }

  async getCartByUserId(userId: number) {
    const userCart = await this.cartRepository.find({
      where: { userId },
      relations: ['product'],
    });

    if (userCart.length === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: 'Cart is empty',
      };
    }

    return { data: userCart, status: HttpStatus.OK };
  }

  async buyCart(userId: number) {
    const userCart = await this.cartRepository.find({
      where: { userId },
      relations: ['product'],
    });

    if (userCart.length === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: 'Cart is empty',
      };
    }

    const errors = [];

    for (const cartItem of userCart) {
      const product = cartItem.product;
      if (product.inventory < cartItem.quantity) {
        const availableQuantity = Math.max(0, product.inventory);
        cartItem.quantity = availableQuantity;
        if (availableQuantity === 0) {
          await this.cartRepository.remove(cartItem);
        } else {
          await this.cartRepository.save(cartItem);
        }
        errors.push(`Not enough inventory for product: ${product.name}`);
      }
    }

    if (errors.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errors.join(', '),
      };
    }

    await Promise.all(
      userCart.map(async (cartItem) => {
        const product = cartItem.product;
        product.inventory -= cartItem.quantity;
        await this.productsRepository.save(product);
      }),
    );

    await this.cartRepository.delete({ userId });

    return {
      status: HttpStatus.OK,
      data: 'Purchase successful',
    };
  }
}
