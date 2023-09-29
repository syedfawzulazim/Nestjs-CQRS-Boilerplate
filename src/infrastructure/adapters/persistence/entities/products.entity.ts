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
import { CreateProductsDto, UpdateProductsDto } from "@src/domain/dtos";

/* In TypeORM we can use both the Active Record and Data Mapper patterns.
   Using the Data Mapper approach, you define all your query methods in separate classes called "repositories", and you save, remove, and load objects using repositories.
   In data mapper your entities are very dumb - they just define their properties and may have some "dummy" methods.
   Simply said, data mapper is an approach to access your database within repositories instead of models.
*/
@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'price' })
  price: number;

  static fromModel(model: CreateProductsDto | UpdateProductsDto): ProductsEntity {
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
