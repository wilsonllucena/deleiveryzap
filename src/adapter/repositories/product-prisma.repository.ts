import { Product } from '@prisma/client';
import { PrismaService } from '../../../database/prisma';
import { ProductRepository } from '../../../src/domain/interfaces/product.repository';
import { CreateProductDTO, UpdateProductDTO } from '../../../dtos/product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async all(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }
  async find(id: string): Promise<Product> {
    return await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, product: UpdateProductDTO): Promise<Product> {
    return await this.prismaService.product.update({
      where: { id },
      data: product,
    });
  }

  async remove(id: string): Promise<void> {
     await this.prismaService.product.delete({ where: { id } });
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
