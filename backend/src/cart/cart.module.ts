import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Products } from 'src/products/products.entity';
import { User } from 'src/auth/user.entity';
import { Order } from 'src/order/order.entity';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Products, User, Order])],
  controllers: [CartController],
  providers: [CartService, OrderService],
})
export class CartModule {}
