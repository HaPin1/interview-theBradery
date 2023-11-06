import { Controller, Get, Param, Res } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const result = await this.productsService.findOne(id);
    res.status(result.status).send(result.data);
  }
}
