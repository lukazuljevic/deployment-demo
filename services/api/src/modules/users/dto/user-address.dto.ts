import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AddressType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumberString, IsString, IsUUID } from 'class-validator';

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
  @IsNumberString()
  @IsNotEmpty({ message: 'ZIP code cannot be empty' })
  zipcode: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  @IsNotEmpty({ message: 'Country cannot be empty' })
  country: string;

  @ApiProperty({ enum: AddressType })
  @IsEnum(AddressType)
  type: AddressType;
}

export class UpdateUserAddressDto extends OmitType(PartialType(UserAddressDto), ['type'] as const) {
  @ApiProperty({ description: 'Id of user address which you want to update' })
  @IsUUID()
  id: string;
}
