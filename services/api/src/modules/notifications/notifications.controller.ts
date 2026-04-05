import { RolesAuth } from '@decorators/auth.decorator';
import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { type RequestWithJwtUser } from '@tstypes/request-types';
import { ActionResponseDto } from 'src/common/dto/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/response.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @RolesAuth(Role.USER, Role.ADMIN)
  @ApiCreatedResponse({
    description: 'Returns success message if notification is created',
    type: ActionResponseDto,
  })
  @Post()
  create(@Req() req: RequestWithJwtUser, @Body() createNotificationDto: CreateNotificationDto) {
    const userId = req.user.sub;
    return this.notificationsService.create(userId, createNotificationDto);
  }

  @RolesAuth(Role.USER, Role.ADMIN)
  @Get()
  @ApiOkResponse({
    description: 'Returns all user notifications',
    type: NotificationResponseDto,
  })
  findAll(@Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.notificationsService.findAll(userId);
  }

  @RolesAuth(Role.USER, Role.ADMIN)
  @Delete('')
  @ApiOkResponse({
    description: 'Returns success message if notifications are deleted',
    type: ActionResponseDto,
  })
  remove(@Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.notificationsService.removeAll(userId);
  }
}
