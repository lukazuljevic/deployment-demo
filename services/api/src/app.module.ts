import { AuthModule } from '@auth/auth.module';
import configuration from '@config/configuration';
import { UserThrottlerGuard } from '@guards/user-throttler.guard';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { SecurityHeadersMiddleware } from '@middleware/security-headers-middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from '@users/users.module';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { MailsModule } from './modules/mails/mails.module';
import { MailsService } from './modules/mails/mails.service';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersController } from './modules/users/users.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['apps/api/.env', '.env'],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60),
          limit: 30,
        },
      ],
    }),
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'web', 'dist'),
    }),
    FavoritesModule,
    OrdersModule,
    MailsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    PrismaService,
    ResponseInterceptor,
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserThrottlerGuard,
    },
    MailsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, SecurityHeadersMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
