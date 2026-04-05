import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'Message to put into notification' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
