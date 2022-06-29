import { Product } from '@prisma/client';
import { PrismaService } from '../../../database/prisma';
import { ProductRepository } from '../../../src/domain/interfaces/product.repository';
import { CreateProductDTO } from '../../../dtos/product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async all(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const { name, description, price } = data;

    return await this.prismaService.product.create({
      data: {
        name,
        description,
        price,
      },
    });
  }
}
