import { AddressType } from "../enums/enum";

export type AccessToken = {
  accessToken: string;
};

export interface MeResponseDto {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export class RegisterRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: UserAddressDto[];
  card: UserCardDto;
}

export class LoginRequestDto {
  email: string;
  password: string;
}

class UserAddressDto {
  street: string;
  city: string;
  zipcode: string;
  country: string;
  type: AddressType;
}

class UserCardDto {
  expiryMonth: number;
  expiryYear: number;
  iban: string;
  cvc: string;
}
