import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ActionResponseDto {
  @ApiProperty({ description: 'Created product id' })
  id: string;

  @ApiPropertyOptional({ description: 'Description of the performed action' })
  message?: string;
}
