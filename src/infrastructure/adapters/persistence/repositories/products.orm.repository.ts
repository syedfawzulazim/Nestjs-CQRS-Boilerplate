import { ProductsEntity } from '@src/infrastructure/adapters/persistence/entities/products.entity';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateProductsDto } from '@src/domain/dtos';
import { Products } from '@src/domain/models/products.model';

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
  async find(id: string): Promise<Products> {
    const productsEntity = await this.manager.findOne(ProductsEntity, id);
    return productsEntity.toModel();
  }
}
