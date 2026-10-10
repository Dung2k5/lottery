import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateLotteryTypeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  regionId?: string;

  @IsString()
  @IsOptional()
  provinceId?: string;

  @IsString()
  @IsOptional()
  issuerId?: string;

  @IsString()
  @IsOptional()
  drawModeId?: string;
}
