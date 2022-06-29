import { Inject, Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import { CreateProductDTO } from "dtos/product.dto";
import { ProductRepository } from "../interfaces/product.repository";

@Injectable()
export class ProductService {
    constructor(@Inject('PRODUCT_REPOSITORY') private readonly productRepository: ProductRepository){}

    async list(): Promise<Product[]> {
        return await this.productRepository.all()
    }

    async create(product: CreateProductDTO): Promise<Product> {
        return await this.productRepository.create(product)
    }
}