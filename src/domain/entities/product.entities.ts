import { Prisma } from "@prisma/client";

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}