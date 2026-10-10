import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayMinSize, Matches, IsDateString } from 'class-validator';

export class CheckTicketDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Matches(/^\d{2,6}$/, { each: true, message: 'Mỗi vé phải là chuỗi số từ 2 đến 6 chữ số' })
  ticketNumbers: string[];

  @IsDateString()
  @IsNotEmpty()
  drawDate: string;

  @IsString()
  @IsOptional()
  lotteryTypeCode?: string;

  @IsString()
  @IsOptional()
  stationCode?: string;
}
