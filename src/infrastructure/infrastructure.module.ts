import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@src/shared/config/typeorm.config';
import { HttpControllers } from './adapters/http/controllers';
import { Providers } from './providers/index';

@Module({
  imports: [CqrsModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [...HttpControllers],
  providers: [...Providers],
  exports: [...Providers],
})
export class InfrastructureModule {}
