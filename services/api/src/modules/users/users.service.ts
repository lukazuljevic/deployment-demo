import { RegisterRequestDto } from '@auth/dto/register-request.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ActionResponseDto } from 'src/common/dto/common';
import { ProfileResponseDto } from './dto/response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AreAddressTypesUnique } from './helpers/address-type-validation.helper';
import mapToDto from './helpers/map-to-dto.helper';

export type UserWithRelations = Prisma.UserGetPayload<{
  include: { addresses: true; card: true };
}>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: RegisterRequestDto): Promise<User> {
    const types = user.addresses.map((addr) => addr.type);
    if (!AreAddressTypesUnique(types))
      throw new ConflictException('Duplicate address types are not allowed');

    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        addresses: {
          create: user.addresses,
        },
        card: {
          create: user.card,
        },
      },
      include: {
        addresses: true,
        card: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneByid(userId: string): Promise<UserWithRelations | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        card: true,
      },
    });
  }

  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const user = await this.findOneByid(userId);

    if (!user) throw new NotFoundException('User not found');

    return mapToDto(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<ActionResponseDto> {
    const user = await this.findOneByid(userId);

    if (!user) throw new NotFoundException('User not found');

    const { addresses, card, ...otherFields } = dto;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...otherFields,
        addresses: addresses?.length
          ? {
              update: addresses.map((addr) => ({
                where: { id: addr.id },
                data: {
                  street: addr.street,
                  city: addr.city,
                  zipcode: addr.zipcode,
                  country: addr.country,
                },
              })),
            }
          : undefined,
        card: card ? { update: card } : undefined,
      },
      include: {
        addresses: true,
        card: true,
      },
    });

    return { message: 'Profile updated successfully', id: updatedUser.id };
  }
}
