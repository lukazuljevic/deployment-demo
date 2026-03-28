import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserAddressDto {
  @ApiProperty({ description: 'Street address' })
  @IsString()
  @IsNotEmpty({ message: 'Street cannot be empty' })
  street: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsNotEmpty({ message: 'City cannot be empty' })
  city: string;

  @ApiProperty({ description: 'ZIP / Postal code' })
  @IsString()
  @IsNotEmpty({ message: 'ZIP code cannot be empty' })
  zipcode: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  @IsNotEmpty({ message: 'Country cannot be empty' })
  country: string;
}

export class UpdateUserAddressDto extends PartialType(UserAddressDto) {}
