import { RegisterRequestDto } from '@auth/dto/register-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import mapToDto from './helpers/map-to-dto.helper';

export type UserWithRelations = Prisma.UserGetPayload<{
  include: { address: true; card: true };
}>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: RegisterRequestDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: {
          create: user.address,
        },
        card: {
          create: user.card,
        },
      },
      include: {
        address: true,
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
        address: true,
        card: true,
      },
    });
  }

  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const user = await this.findOneByid(userId);

    if (!user) throw new NotFoundException('User not found');

    return mapToDto(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    const user = await this.findOneByid(userId);

    if (!user) throw new NotFoundException('User not found');

    const { address, card, ...otherFields } = dto;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...otherFields,
        address: address ? { update: address } : undefined,
        card: card ? { update: card } : undefined,
      },
      include: {
        address: true,
        card: true,
      },
    });

    return mapToDto(updatedUser);
  }
}
