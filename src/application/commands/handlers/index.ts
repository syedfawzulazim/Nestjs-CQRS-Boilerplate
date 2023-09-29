import { CreateProductsHandler } from './create-products.handler';
import { UpdateProductsHandler } from './update-products.handler';
import { DeleteProductsByIdHandler } from './delete-products-by-id.handler';

export const CommandHandlers = [CreateProductsHandler, UpdateProductsHandler, DeleteProductsByIdHandler];
