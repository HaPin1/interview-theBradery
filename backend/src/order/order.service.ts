import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Products } from 'src/products/products.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(
    user: User,
    products: Products[],
  ): Promise<{ success: boolean }> {
    const order = new Order();
    order.user = user;
    order.products = products;
    order.totalPrice = products.reduce(
      (total, product) => total + product.price,
      0,
    );

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
