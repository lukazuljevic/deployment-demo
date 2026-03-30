import { MailsModule } from '@mails/mails.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  imports: [MailsModule, UsersModule],
  providers: [OrdersService],
})
export class OrdersModule {}
