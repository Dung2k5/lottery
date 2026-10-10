import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class PrizeResultDto {
  @IsString()
  @IsNotEmpty()
  prizeCode: string;

  @IsString()
  @IsNotEmpty()
  prizeName: string;

  @IsArray()
  @IsString({ each: true })
  winningNumbers: string[];

  @IsOptional()
  order?: number;
}

export class CreateDrawSessionDto {
  @IsString()
  @IsNotEmpty()
  lotteryTypeId: string;

  @IsString()
  @IsOptional()
  stationId?: string;

  @IsDateString()
  @IsNotEmpty()
  drawDate: string;

  @IsString()
  @IsOptional()
  drawCode?: string;

  @IsString()
  @IsOptional()
  dataSourceId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrizeResultDto)
  results: PrizeResultDto[];
}
