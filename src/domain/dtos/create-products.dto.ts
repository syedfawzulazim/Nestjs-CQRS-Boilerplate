import { Products } from '../models/products.model';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(props: Products) {
    this.title = props.title;
    this.description = props.description;
    this.price = props.price;
  }
}
