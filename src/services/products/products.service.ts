import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/models/products';
import { CreateProduct, UpdateProduct } from '../../schemas/products';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll(limit: number, offset: number) {
    console.log(`${limit} - ${offset}`);
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  create(payload: CreateProduct) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: UpdateProduct) {
    const productFound = this.products.findIndex((item) => item.id === id);
    let message = '';
    if (productFound > 0) {
      this.products[productFound] = {
        id,
        ...this.products[productFound],
        ...payload,
      };
      message = 'Product updated';
    } else {
      message = 'Product not found';
    }
    return message;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException('Error no se encontro', HttpStatus.BAD_REQUEST);
    }
    this.products.splice(index, 1);
    return true;
  }
}
