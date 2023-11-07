import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Products } from 'src/products/products.entity';
import { HttpStatus } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly orderService: OrderService,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return { status: HttpStatus.OK, data: 'User not found' };
    }

    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      return {
        status: HttpStatus.OK,
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
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (!cartItem) {
      cartItem = new Cart();
      cartItem.user = user;
      cartItem.product = product;
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

  async removeFromCart(userId: number, productId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return { status: HttpStatus.OK, data: 'User not found' };
    }

    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      return { status: HttpStatus.OK, data: 'Product not found' };
    }

    const cartItems = await this.cartRepository.find({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (!cartItems || cartItems.length === 0) {
      return { status: HttpStatus.OK, data: 'No items to remove from cart' };
    }

    await Promise.all(
      cartItems.map(async (cartItem) => {
        await this.cartRepository.remove(cartItem);
      }),
    );

    return { status: HttpStatus.OK, data: 'Items removed from cart' };
  }

  async getCartByUserId(userId: number) {
    const userCart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    return { data: userCart, status: HttpStatus.OK };
  }

  async buyCart(userId: number) {
    const userCart = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (userCart.length === 0) {
      return {
        status: HttpStatus.OK,
        data: 'Cart is empty',
      };
    }

    userCart.forEach((item) => {
      item.product.price = Number(item.product.price);
    });

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return { status: HttpStatus.OK, data: 'User not found' };
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

    const products = userCart.map((cartItem) => cartItem.product);

    const orderCreationResult = await this.orderService.createOrder(
      user,
      products,
    );

    if (!orderCreationResult.success) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: 'Failed to create the order',
      };
    }

    await Promise.all(
      userCart.map(async (cartItem) => {
        const product = cartItem.product;
        product.inventory -= cartItem.quantity;
        await this.productsRepository.save(product);
      }),
    );

    await this.cartRepository.delete({ user: { id: userId } });

    return {
      status: HttpStatus.OK,
      data: 'Purchase successful',
    };
  }
}
