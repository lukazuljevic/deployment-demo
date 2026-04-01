import { RolesAuth } from '@decorators/auth.decorator';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ProductListDto } from '@products/dto/response.dto';
import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ActionResponseDto } from 'src/common/dto/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @RolesAuth(Role.USER, Role.ADMIN)
  @Post(':productId')
  @ApiCreatedResponse({
    description: 'Returns id if product is successfuly added to favorites',
    type: () => ActionResponseDto,
  })
  create(@Param('productId', ParseUUIDPipe) productId: string, @Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.favoritesService.create(userId, productId);
  }

  @RolesAuth(Role.USER, Role.ADMIN)
  @Get()
  @ApiOkResponse({
    description: 'Returns all favorite products of the authenticated user',
    type: () => ProductListDto,
    isArray: true,
  })
  findUserFavorites(@Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.favoritesService.findUserFavorites(userId);
  }

  @RolesAuth(Role.USER, Role.ADMIN)
  @Delete(':productId')
  @ApiOkResponse({
    description: 'Returns id if product is successfuly removed from favorites',
    type: () => ActionResponseDto,
  })
  remove(@Param('productId', ParseUUIDPipe) productId: string, @Req() req: RequestWithJwtUser) {
    const userId = req.user.sub;
    return this.favoritesService.remove(userId, productId);
  }
}
