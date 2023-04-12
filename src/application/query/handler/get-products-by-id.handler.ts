import { Products } from '@src/domain/models/products.model';
import { GetProductsByIdQuery } from '@src/application/query/get-products-by-id.query';
import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '@src/infrastructure/providers/products.repository.provider';

@Injectable()
@QueryHandler(GetProductsByIdQuery)
export class GetProductsByIdHandler
  implements IQueryHandler<GetProductsByIdQuery>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(query: GetProductsByIdQuery): Promise<Products> {
    const product = await this.productsRepository.find(query.id);
    return product;
  }
}
