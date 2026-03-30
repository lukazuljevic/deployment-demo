import { AddressType } from "../enums/enum";

export interface UserAddressResponseDto {
  street: string;
  city: string;
  zipcode: string;
  type: AddressType;
  country: string;
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
  avatarUrl?: string;
  addresses: UserAddressResponseDto[];
  card: UserCardResponseDto;
}
