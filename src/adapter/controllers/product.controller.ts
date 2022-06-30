import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDTO, UpdateProductDTO } from '../../../dtos/product.dto';
import { ProductService } from '../../domain/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async list(): Promise<Product[]> {
    return this.productService.list();
  }

  @Post('/')
  async create(@Body() data: CreateProductDTO): Promise<Product> {
    return await this.productService.create(data);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Product> {
    return await this.productService.find(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.productService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: UpdateProductDTO): Promise<Product> {
    return await this.productService.update(id, product);
  }
}
