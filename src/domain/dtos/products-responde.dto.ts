import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Products } from "@src/domain/models/products.model";

export class ProductsRespondDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(product: Products) {
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
  }
}
