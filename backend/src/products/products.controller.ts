import { Controller, Get, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.productsService.findAll();
    res.status(result.status).send(result.data);
  }
}
