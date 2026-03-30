import { AddressType } from '@prisma/client';

export function AreAddressTypesUnique(types: AddressType[]) {
  const uniqueTypes = new Set(types);

  return uniqueTypes.size == types.length;
}
