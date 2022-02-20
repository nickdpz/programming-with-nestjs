import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [AppController, CategoriesController],
  providers: [AppService],
})
export class AppModule {}
