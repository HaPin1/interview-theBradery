import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Products } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Products])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
