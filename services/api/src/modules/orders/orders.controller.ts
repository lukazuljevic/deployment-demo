import { RolesAuth } from '@decorators/auth.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ActionResponseDto } from 'src/common/dto/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
