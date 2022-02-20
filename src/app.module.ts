import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [
    AppController,
    CategoriesController,
    ProductsController,
    OrdersController,
    UsersController,
    CustomersController,
  ],
  providers: [AppService],
})
export class AppModule {}
