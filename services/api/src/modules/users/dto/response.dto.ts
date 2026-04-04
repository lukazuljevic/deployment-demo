import { AddressType } from '@cart-app/types';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddressResponseDto {
  @ApiProperty({ description: 'Id of user address' })
  id: string;

  @ApiProperty({ description: 'Street address' })
  street: string;

  @ApiProperty({ description: 'City' })
  city: string;

  @ApiProperty({ description: 'ZIP / Postal code' })
  zipcode: string;

  @ApiProperty({ description: '(Billing/Shipping) Adress type' })
  type: AddressType;

  @ApiProperty({ description: 'Country' })
  country: string;

  @ApiProperty({ description: 'County' })
  county: string;
}

export class UserCardResponseDto {
  @ApiProperty({ description: 'Card expiry month' })
  expiryMonth: number;

  @ApiProperty({ description: 'Card expiry year' })
  expiryYear: number;

  @ApiProperty({ description: 'IBAN number' })
  iban: string;

  @ApiProperty({ description: 'Card CVC code' })
  cvc: string;
}

export class ProfileResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;

  @ApiProperty({ description: 'User address', type: () => [UserAddressResponseDto] })
  addresses: UserAddressResponseDto[];

  @ApiProperty({ description: 'User card info', type: () => UserCardResponseDto })
  card: UserCardResponseDto;
}
