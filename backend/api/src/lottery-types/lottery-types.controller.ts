import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LotteryTypesService } from './lottery-types.service';
import { CreateLotteryTypeDto } from './dto/create-lottery-type.dto';
import { UpdateLotteryTypeDto } from './dto/update-lottery-type.dto';

@Controller('lottery-types')
export class LotteryTypesController {
  constructor(private readonly lotteryTypesService: LotteryTypesService) {}

  @Post()
  create(@Body() createLotteryTypeDto: CreateLotteryTypeDto) {
    return this.lotteryTypesService.create(createLotteryTypeDto);
  }

  @Get()
  findAll() {
    return this.lotteryTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.lotteryTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateLotteryTypeDto: UpdateLotteryTypeDto) {
    return this.lotteryTypesService.update(id, updateLotteryTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.lotteryTypesService.remove(id);
  }
}
