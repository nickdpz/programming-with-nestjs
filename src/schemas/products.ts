import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Matches,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsNotEmpty()
  @Matches(/(https:\/\/)[a-zA-Z0-9_-]{2,20}/)
  @IsUrl()
  readonly image: string;
}

export class UpdateProduct extends PartialType(CreateProduct) {}
