import { RolesAuth } from '@decorators/auth.decorator';
import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ActionResponseDto } from 'src/common/dto/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { OrderListDto, OrderUpdateResponseDto } from './dto/response.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @RolesAuth(Role.ADMIN, Role.USER)
  @Post()
  @ApiCreatedResponse({
    description: 'Returns id if order is successfuly created',
    type: () => ActionResponseDto,
  })
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.ordersService.create(userId, createOrderDto);
  }

  @RolesAuth(Role.ADMIN)
  @Get()
  @ApiOkResponse({
    description: 'Returns orders of all users',
    type: () => OrderListDto,
  })
  findAll(@Body() dto: FindOrdersDto) {
    return this.ordersService.findAll(dto);
  }
  @RolesAuth(Role.ADMIN)
  @Patch(':id/status')
  @ApiOkResponse({
    description: 'Returns id and new status of updated order',
    type: () => OrderUpdateResponseDto,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.update(id, dto);
  }
}
