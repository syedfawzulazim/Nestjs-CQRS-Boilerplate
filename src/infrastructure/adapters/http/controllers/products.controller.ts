import { Products } from '@src/domain/models/products.model';
import { CreateProductsDto } from '@src/domain/dtos/create-products.dto';
import { Controller, Get, Param, Post, Req, Body, Put, Delete } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GetProductsByIdQuery } from '@src/application/query/get-products-by-id.query';
import { CreateProductsCommand, DeleteProductsByIdCommand } from "@src/application/commands";
import { UpdateProductsCommand } from "@src/application/commands/update-products.command";
import { UpdateProductsDto } from "@src/domain/dtos";
import { ProductsRespondDto } from "@src/domain/dtos/products-responde.dto";

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
  ): Promise<Products> {
    const product = await this.commandBus.execute(
      new CreateProductsCommand(createProductsDto),
    );
    return product;
  }

  @Get(':id')
  @ApiOkResponse({
    type: ProductsRespondDto,
  })
  async get(
    @Param('id') id: string,
  ): Promise<ProductsRespondDto> {
    return await this.queryBus.execute(new GetProductsByIdQuery(id));
  }

  @Put('update/:id')
  @ApiBody({
    description: 'Update products',
    type: UpdateProductsDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductsDto,
  ) {
    return await this.commandBus.execute(new UpdateProductsCommand(id, updateProductsDto));
  }

  @Delete('delete/:id')
  @ApiNotFoundResponse({
    description: 'Product not found'
  })
  async delete(
    @Param('id') id: string,
  ){
    return await this.commandBus.execute(( new DeleteProductsByIdCommand(id)));
  }
}
