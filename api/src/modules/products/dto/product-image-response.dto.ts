import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductImageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Image URL' })
  url: string;

  @ApiPropertyOptional({ description: 'Color associated with image' })
  color?: string;
}
