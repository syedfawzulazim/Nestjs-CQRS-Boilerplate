import { CreateProductsDto } from '@src/domain/dtos';

export class CreateProductsCommand {
  constructor(public readonly createProductsDto: CreateProductsDto) {}
}
