import {
  MAX_CITY_LENGTH,
  MAX_COUNTRY_LENGTH,
  MAX_STREET_LENGTH,
  MAX_ZIP_LENGTH,
  MIN_CITY_LENGTH,
  MIN_COUNTRY_LENGTH,
  MIN_STREET_LENGTH,
  MIN_ZIP_LENGTH,
} from '@cart-app/types';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AddressType } from '@prisma/client';
import { IsEnum, IsNumberString, IsString, IsUUID, Length } from 'class-validator';

export class UserAddressDto {
  @ApiProperty({ description: 'Street address' })
  @IsString()
  @Length(MIN_STREET_LENGTH, MAX_STREET_LENGTH)
  street: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @Length(MIN_CITY_LENGTH, MAX_CITY_LENGTH)
  city: string;

  @ApiProperty({ description: 'ZIP / Postal code' })
  @IsNumberString()
  @Length(MIN_ZIP_LENGTH, MAX_ZIP_LENGTH)
  zipcode: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  @Length(MIN_COUNTRY_LENGTH, MAX_COUNTRY_LENGTH)
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
