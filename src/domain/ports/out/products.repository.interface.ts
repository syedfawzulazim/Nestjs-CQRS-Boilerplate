import { CreateProductsDto } from '@src/domain/dtos/create-products.dto';
import { Products } from '@src/domain/models/products.model';
import { UpdateProductsDto } from "@src/domain/dtos";

export interface IProductsRepository {
  create(createProductsDto: CreateProductsDto): Promise<Products>;
  findOne(id: string): Promise<Products>;
  update(product: Products, updateProductsDto: UpdateProductsDto );
}
