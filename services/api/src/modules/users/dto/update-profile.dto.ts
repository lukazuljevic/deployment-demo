import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '@cart-app/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsValidName } from '@validators/name.validator';
import { Type } from 'class-transformer';
import { IsOptional, IsUrl, Length, ValidateNested } from 'class-validator';
import { UpdateUserAddressDto } from './user-address.dto';
import { UpdateUserCardDto } from './user-card.dto';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH)
  @IsValidName()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH)
  @IsValidName()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({ type: () => [UpdateUserAddressDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  addresses?: UpdateUserAddressDto[];

  @ApiPropertyOptional({ type: () => UpdateUserCardDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserCardDto)
  card?: UpdateUserCardDto;
}
