import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, Min, Max } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsOptional()
  stationId?: string;

  @IsString()
  @IsNotEmpty()
  lotteryTypeId: string;

  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @IsString()
  @IsNotEmpty()
  drawTime: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
