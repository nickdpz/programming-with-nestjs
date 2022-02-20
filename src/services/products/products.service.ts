import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/products';

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

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
  }
  update(id: number, payload: Product) {
    const productFound = this.products.findIndex((item) => item.id === id);
    let message = '';
    if (productFound > 0) {
      this.products[productFound] = {
        id: id,
        ...payload,
      };
      message = 'Product updated';
    } else {
      message = 'Product not found';
    }
    return message;
  }

  delete(id: number) {
    const productFound = this.products.findIndex((item) => item.id === id);
    let message = '';
    if (productFound > 0) {
      this.products.splice(productFound, 1);
      message = 'product deleted';
    } else {
      message = 'product not found';
    }
    return message;
  }
}
