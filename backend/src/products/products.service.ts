import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findById(id: number): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateInventory(
    productId: number,
    newInventory: number,
  ): Promise<Products> {
    const product = await this.findById(productId);
    product.inventory = newInventory;
    return this.productsRepository.save(product);
  }
}
