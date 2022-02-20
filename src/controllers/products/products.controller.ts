import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private _productsService: ProductsService) {}
  @Get()
  list(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this._productsService.findAll(limit, offset);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) // 👈 Using decorator
  getOne(@Res() response: Response, @Param('productId') productId: string) {
    const result = this._productsService.findOne(Number(productId));
    response.status(200).send(result);
  }

  @Post()
  create(@Body() payload: any) {
    this._productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this._productsService.update(Number(id), payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this._productsService.delete(Number(id));
  }
}
