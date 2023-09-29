import { UpdateProductsDto } from '@src/domain/dtos';

export class UpdateProductsCommand {
  constructor(
    public readonly id: string,
    public readonly updateProductsDto: UpdateProductsDto
  ) {}
}
