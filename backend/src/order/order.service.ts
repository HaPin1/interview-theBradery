import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/auth/user.entity';
import { Cart } from 'src/cart/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(
    user: User,
    userCart: Cart[],
  ): Promise<{ success: boolean }> {
    const order = new Order();
    order.user = user;
    order.products = userCart.map((cartItem) => cartItem.product);
    order.totalPrice = userCart.reduce((total, cartItem) => {
      const productPrice = cartItem.product.price;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);

    try {
      await this.orderRepository.save(order);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
  async getOrdersWithDetails() {
    return this.orderRepository.find({
      relations: ['products'],
    });
  }
}
