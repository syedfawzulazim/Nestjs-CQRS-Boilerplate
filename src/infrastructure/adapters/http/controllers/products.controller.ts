import { IViewModel } from '@src/domain/interfaces';
import { Products } from '@src/domain/models/products.model';
import { CreateProductsDto } from '@src/domain/dtos/create-products.dto';
import { Controller, Get, Param, Post, Req, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GetProductsByIdQuery } from '@src/application/query/get-products-by-id.query';
import { CreateProductsCommand } from '@src/application/commands';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBody({
    description: 'Create products',
    type: CreateProductsDto,
  })
  async create(
    @Body() createProductsDto: CreateProductsDto,
    @Req() req: Request,
  ) {
    const product = await this.commandBus.execute(
      new CreateProductsCommand(createProductsDto),
    );
    return product;
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateProductsDto,
  })
  async get(@Param('id') id: string): Promise<IViewModel> {
    const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
    console.log(product);
    return product;
  }
}
