import { ProductsEntity } from '@src/infrastructure/adapters/persistence/entities/products.entity';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateProductsDto, UpdateProductsDto } from "@src/domain/dtos";
import { Products } from '@src/domain/models/products.model';
import { ProductNotFoundException } from "@src/domain/exceptions/product.exceptions";

@Injectable()
export class ProductsOrmRepository implements IProductsRepository {
  constructor(private readonly manager: EntityManager) {}

  async create(createProductsDto: CreateProductsDto): Promise<Products> {
    const productEntity = await this.manager.save<ProductsEntity>(
      this.manager.create<ProductsEntity>(
        ProductsEntity,
        ProductsEntity.fromModel(createProductsDto),
      ),
    );
    return productEntity.toModel();
  }

  async findOne(id: string): Promise<Products> {
    const productsEntity = await this.manager.findOne(ProductsEntity, id);
    if (!productsEntity) {
      const message = `Could not find Product for Id: ${id}`;
      throw new ProductNotFoundException(message);
    }
    return productsEntity.toModel();
  }

  async find(): Promise<Products[]> {
    const productsEntities: ProductsEntity[] = await this.manager.find<ProductsEntity>(ProductsEntity);
    return productsEntities.map(entity => entity.toModel());
  }

  async update(product: Products, updateProductsDto: UpdateProductsDto): Promise<void> {
   await this.manager.update<ProductsEntity>(
     ProductsEntity,
     product.id,
     ProductsEntity.fromModel(updateProductsDto),
    );
  }

  async  delete(id: string): Promise<void> {
    await this.manager.delete(ProductsEntity, id);
  }
}
