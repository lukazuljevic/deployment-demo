import { AddressType } from "../enums/enum";

export type AccessToken = {
  access_token: string;
};

export class RegisterRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: UserAddressDto[];
  card: UserCardDto;
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
