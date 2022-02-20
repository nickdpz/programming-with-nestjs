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

@Controller('products')
export class ProductsController {
  @Get()
  list(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) // 👈 Using decorator
  getOne(@Res() response: Response, @Param('productId') productId: string) {
    response.status(200).send({ productId });
  }

  @Post()
  create(@Body() payload: any) {
    console.log(payload);
    return {
      message: 'accion de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
