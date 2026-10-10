import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PrizeResultDto } from './create-result.dto';

export class UpdateDrawResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrizeResultDto)
  results: PrizeResultDto[];

  @IsString()
  @IsOptional()
  reason?: string;
}
