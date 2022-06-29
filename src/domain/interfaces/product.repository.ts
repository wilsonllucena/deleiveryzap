import { Product } from "@prisma/client";
import { CreateProductDTO } from "dtos/product.dto"

export interface ProductRepository {
  all(): Promise<Product[]>;
  create(data: CreateProductDTO): Promise<Product>;
}