import { RolesAuth } from '@decorators/auth.decorator';
import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import type { RequestWithJwtUser } from '@tstypes/request-types';
import { ProfileResponseDto } from './dto/response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RolesAuth(Role.ADMIN, Role.USER)
  @Get('me')
  @ApiOkResponse({ type: () => ProfileResponseDto, description: 'Returns current user profile' })
  async me(@Req() req: RequestWithJwtUser) {
    const id = req.user.sub;
    return this.usersService.getProfile(id);
  }

  @RolesAuth(Role.ADMIN, Role.USER)
  @Put('me')
  @ApiOkResponse({
    type: () => UpdateProfileDto,
    description: 'Returns confirmation if profile is updated',
  })
  async updateMe(@Req() req: RequestWithJwtUser, @Body() dto: UpdateProfileDto) {
    const id = req.user.sub;
    return this.usersService.updateProfile(id, dto);
  }
}
