import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePrizeStructureDto {
  @IsString()
  @IsNotEmpty()
  lotteryTypeId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  digitCount?: number;

  @IsString()
  @IsOptional()
  prizeValue?: string;

  @IsString()
  @IsOptional()
  matchingRule?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
