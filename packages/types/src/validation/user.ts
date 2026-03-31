export const nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 50;
export const MIN_PASSWORD_LENGTH = 8;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const MIN_CITY_LENGTH = 2;
export const MAX_CITY_LENGTH = 50;
export const MIN_STREET_LENGTH = 5;
export const MAX_STREET_LENGTH = 100;
export const MIN_ZIP_LENGTH = 4;
export const MAX_ZIP_LENGTH = 10;
export const MIN_COUNTRY_LENGTH = 2;
export const MAX_COUNTRY_LENGTH = 100;
export const zipcodeRegex = /^\d+$/;

export const MIN_EXPIRY_MONTH = 1;
export const MAX_EXPIRTY_MONTH = 12;
export const ibanRegex = /^[A-Z]{2}[A-Z\d]{11,30}$/;
export const CVC_LENGTH = 3;
export const cvcRegex = /^\d+$/;
