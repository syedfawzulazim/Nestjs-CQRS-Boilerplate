import { GetProductsByIdHandler } from './query/handler/get-products-by-id.handler';
import { QueryHandlers } from './query/handler/index';
import { CommandHandlers } from '@src/application/commands/handlers';
import { InfrastructureModule } from '@src/infrastructure/infrastructure.module';
import { DomainModule } from '@src/domain/domain.module';
import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

@Module({
  imports: [CqrsModule, DomainModule, InfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
