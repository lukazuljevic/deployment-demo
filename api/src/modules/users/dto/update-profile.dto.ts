import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidName } from '@validators/name.validator';
import { Type } from 'class-transformer';
import { IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { UpdateUserAddressDto } from './user-address.dto';
import { UpdateUserCardDto } from './user-card.dto';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsValidName()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsValidName()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({ type: () => UpdateUserAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserAddressDto)
  address?: UpdateUserAddressDto;

  @ApiPropertyOptional({ type: () => UpdateUserCardDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserCardDto)
  card?: UpdateUserCardDto;
}
