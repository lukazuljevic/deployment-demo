import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotExpired } from '@validators/expiry-date.validator';
import { IsInt, IsOptional, Length, Matches, Max, Min, Validate } from 'class-validator';

export class UserCardDto {
  @ApiPropertyOptional({ description: 'Card expiry month' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  expiryMonth: number;

  @ApiPropertyOptional({ description: 'Card expiry year' })
  @IsOptional()
  @IsInt()
  expiryYear: number;

  @ApiPropertyOptional({ description: 'IBAN number' })
  @IsOptional()
  @Matches(/^[A-Z]{2}[A-Z\d]{11,30}$/, { message: 'Invalid IBAN format' })
  iban: string;

  @ApiPropertyOptional({ description: 'Card CVC code' })
  @IsOptional()
  @Length(3)
  @Matches(/^\d+$/, { message: 'CVC must contain only numbers' })
  cvc: string;

  @Validate(IsNotExpired)
  _expiryCheck?: any;
}

export class UpdateUserCardDto extends PartialType(UserCardDto) {}
