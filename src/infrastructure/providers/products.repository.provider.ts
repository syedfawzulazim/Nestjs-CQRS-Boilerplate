import { EntityManager } from 'typeorm';
import { ProductsOrmRepository } from '@src/infrastructure/adapters/persistence/repositories/products.orm.repository';

export const PRODUCT_REPOSITORY_TOKEN = 'PRODUCT_REPOSITORY_TOKEN';

export const ProductsRepositoryProvider = {
  provide: PRODUCT_REPOSITORY_TOKEN,
  useFactory: (manager: EntityManager) => {
    return new ProductsOrmRepository(manager);
  },
  inject: [EntityManager],
};
