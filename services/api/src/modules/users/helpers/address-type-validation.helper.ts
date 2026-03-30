import { AddressType } from '@cart-app/types';

export function AreAddressTypesUnique(types: AddressType[]) {
  const uniqueTypes = new Set(types);

  return uniqueTypes.size == types.length;
}
