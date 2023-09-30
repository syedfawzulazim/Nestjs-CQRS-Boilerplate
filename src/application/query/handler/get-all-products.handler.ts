import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '@src/infrastructure/providers/products.repository.provider';
import { ProductsRespondDto } from "@src/domain/dtos/products-responde.dto";
import { GetAllProductsQuery } from "@src/application/query";
import { Products } from "@src/domain/models/products.model";

@Injectable()
@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler
  implements IQueryHandler<GetAllProductsQuery>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(query: GetAllProductsQuery): Promise<Products[]>{
    const products = await this.productsRepository.find();
    return products;
  }
}
