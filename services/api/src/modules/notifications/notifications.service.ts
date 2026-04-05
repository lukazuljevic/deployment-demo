import { SortOrder } from '@cart-app/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ActionResponseDto } from 'src/common/dto/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/response.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateNotificationDto): Promise<ActionResponseDto> {
    const notification = await this.prisma.notification.create({
      data: { message: dto.message, userId },
    });

    return { message: 'Notification successfully created', id: notification.id };
  }

  async removeAll(userId: string): Promise<ActionResponseDto> {
    await this.prisma.notification.deleteMany({ where: { userId } });

    return { message: 'Notifications successfully deleted' };
  }

  async findAll(userId: string): Promise<NotificationResponseDto[]> {
    return await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: SortOrder.DESC },
    });
  }
}
