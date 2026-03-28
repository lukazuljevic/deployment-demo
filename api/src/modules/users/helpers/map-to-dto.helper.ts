import { UserWithRelations } from '@users/users.service';
import { omit } from 'lodash';

const mapToDto = (user: UserWithRelations) => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl ?? undefined,
    address: omit(user.address, ['userId']),
    card: omit(user.card, ['userId']),
  };
};

export default mapToDto;
