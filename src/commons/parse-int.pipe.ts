import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    console.log(metadata);
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not an number`);
    }
    return val;
  }
}
