import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "dtos/product.dto"

export interface ProductRepository {
  all(): Promise<Product[]>;
  create(data: CreateProductDTO): Promise<Product>;
  find(id: string): Promise<Product>
  remove(id: string): Promise<void>
  update(id: string, data: UpdateProductDTO): Promise<any>
}