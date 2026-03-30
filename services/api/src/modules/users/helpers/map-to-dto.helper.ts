import { ProfileResponseDto } from '@cart-app/types';
import { UserWithRelations } from '@users/users.service';
import { omit } from 'lodash';

const mapToDto = (user: UserWithRelations): ProfileResponseDto => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl ?? undefined,
    addresses: user.addresses?.map(addr=>omit(addr, ['userId'])),
    card: omit(user.card, ['userId']),
  };
};

export default mapToDto;
