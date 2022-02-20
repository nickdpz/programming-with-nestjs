# Programming with nestjs

## Description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Controllers

- Generate controllers with test file

```sh
$ nest g co controllers/products
```

- Add query in controller

```ts
import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('id')
  getProducts(
    @Param('productId') productId: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `product ${productId} limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  }
}
```

## License

Nest is [MIT licensed](LICENSE).
