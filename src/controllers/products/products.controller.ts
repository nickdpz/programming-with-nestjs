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
  ParseIntPipe,
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
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Res() response: Response, @Param('id', ParseIntPipe) id: number) {
    const result = this._productsService.findOne(id);
    response.status(200).send(result);
  }

  @Post()
  create(@Body() payload: any) {
    return this._productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return this._productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this._productsService.delete(Number(id));
  }
}
