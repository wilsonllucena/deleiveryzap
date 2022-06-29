import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma';
import { ProductController } from './adapter/controllers/product.controller';
import { PrismaProductRepository } from './adapter/repositories/product-prisma.repository';
import { ProductService } from './domain/services/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: PrismaProductRepository,
    },
  ],
})
export class AppModule {}
