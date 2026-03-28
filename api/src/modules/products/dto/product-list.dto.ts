import { ApiProperty } from '@nestjs/swagger';
import { ProductImageResponseDto } from './product-image-response.dto';

export class ProductListDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ description: 'If user marks product as favorite this field will be true' })
  isFavorite: boolean;

  @ApiProperty({ type: [ProductImageResponseDto] })
  images: ProductImageResponseDto[];
}
