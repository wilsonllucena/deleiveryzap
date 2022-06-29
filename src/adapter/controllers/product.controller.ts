import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDTO } from '../../../dtos/product.dto';
import { ProductService } from '../../domain/services/product.service';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService){}

  @Get('/')
  async index(): Promise<Product[]> {
    return this.productService.list();
  }

  @Post('/')
  async create(@Body() data: CreateProductDTO): Promise<Product> {
    return await this.productService.create(data);
  }
}
