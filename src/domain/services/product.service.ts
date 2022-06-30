import { Inject, Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "dtos/product.dto";
import { ProductRepository } from "../interfaces/product.repository";

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: ProductRepository,
  ) {}

  async list(): Promise<Product[]> {
    return await this.productRepository.all();
  }

  async find(id: string) {
    const product = await this.productRepository.find(id);
    return product;
  }

  async create(product: CreateProductDTO): Promise<Product> {
    return await this.productRepository.create(product);
  }

  async update(id: string, product: UpdateProductDTO) {
    const productExist = await this.productRepository.find(id);

    if (!productExist) {
      throw new Error('Product not found');
    }

    return await this.productRepository.update(id, product);
  }

  async remove(id: string) {
    const productExist = await this.productRepository.find(id);

    if (!productExist) {
      throw new Error('Product not found');
    }

    await this.productRepository.remove(id);
  }
}