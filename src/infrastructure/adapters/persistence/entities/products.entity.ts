import { Products } from '@src/domain/models/products.model';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateProductsDto } from '@src/domain/dtos';

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'price' })
  price: number;

  static fromModel(model: CreateProductsDto): ProductsEntity {
    const entity = new ProductsEntity();
    entity.title = model.title;
    entity.description = model.description;
    entity.price = model.price;
    return entity;
  }

  toModel(): Products {
    return new Products({
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
    });
  }
}
