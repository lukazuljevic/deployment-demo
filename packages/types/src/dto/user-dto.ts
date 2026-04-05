import { AddressType } from "../enums/enum";

export interface UserAddressResponseDto {
  id: string;
  street: string;
  city: string;
  zipcode: string;
  type: AddressType;
  country: string;
  county: string;
}

export interface UserCardResponseDto {
  expiryMonth: number;
  expiryYear: number;
  iban: string;
  cvc: string;
}

export interface ProfileResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: UserAddressResponseDto[];
  card: UserCardResponseDto;
}

export interface UserAddressDto {
  street: string;
  city: string;
  zipcode: string;
  country: string;
  county: string;
  type: AddressType;
}
