import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductsCommand } from '@src/application/commands';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '@src/infrastructure/providers/products.repository.provider';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateProductsCommand)
export class CreateProductsHandler
  implements ICommandHandler<CreateProductsCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(command: CreateProductsCommand) {
    const { createProductsDto } = command;
    const product = await this.productsRepository.create(createProductsDto);
    return product;
  }
}
