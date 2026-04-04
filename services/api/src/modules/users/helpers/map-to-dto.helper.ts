import { ProfileResponseDto } from '@users/dto/response.dto';
import { UserWithRelations } from '@users/users.service';
import { omit } from 'lodash';

const mapToDto = (user: UserWithRelations): ProfileResponseDto => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    addresses: user.addresses?.map((addr) => omit(addr, ['userId'])),
    card: omit(user.card, ['userId']),
  };
};

export default mapToDto;
