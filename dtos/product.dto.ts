import { PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
