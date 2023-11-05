import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async findAll() {
    const products = await this.productsRepository.find();
    return { data: products, status: HttpStatus.OK, message: 'Success' };
  }
}
