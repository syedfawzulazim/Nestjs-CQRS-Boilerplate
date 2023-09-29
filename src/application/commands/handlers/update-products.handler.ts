import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '@src/infrastructure/providers/products.repository.provider';
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProductsCommand } from "@src/application/commands/update-products.command";

@Injectable()
@CommandHandler(UpdateProductsCommand)
export class UpdateProductsHandler
  implements ICommandHandler<UpdateProductsCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(command: UpdateProductsCommand) {
    const {id,  updateProductsDto } = command;

    const product = await this.productsRepository.findOne(id);
    if(!product) {
       console.log(`Product with id: ${id} not found`)
    }
    await this.productsRepository.update(product, updateProductsDto);
  }
}
