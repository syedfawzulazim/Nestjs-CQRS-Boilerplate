import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IProductsRepository } from '@src/domain/ports/out/products.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '@src/infrastructure/providers/products.repository.provider';
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DeleteProductsByIdCommand } from "@src/application/commands";


@Injectable()
@CommandHandler(DeleteProductsByIdCommand)
export class DeleteProductsByIdHandler
  implements ICommandHandler<DeleteProductsByIdCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(command: DeleteProductsByIdCommand): Promise<void> {
    await this.productsRepository.delete(command.id);
  }
}
