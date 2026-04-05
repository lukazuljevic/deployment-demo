import { ApiPropertyOptional } from '@nestjs/swagger';

export class ActionResponseDto {
  @ApiPropertyOptional({ description: 'Created product id' })
  id?: string;

  @ApiPropertyOptional({ description: 'Description of the performed action' })
  message?: string;
}
