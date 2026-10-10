import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PrizeStructuresService } from './prize-structures.service';
import { CreatePrizeStructureDto } from './dto/create-prize-structure.dto';
import { UpdatePrizeStructureDto } from './dto/update-prize-structure.dto';

@Controller('prize-structures')
export class PrizeStructuresController {
  constructor(private readonly prizeStructuresService: PrizeStructuresService) {}

  @Post()
  create(@Body() createPrizeStructureDto: CreatePrizeStructureDto) {
    return this.prizeStructuresService.create(createPrizeStructureDto);
  }

  @Get()
  findAll() {
    return this.prizeStructuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.prizeStructuresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePrizeStructureDto: UpdatePrizeStructureDto) {
    return this.prizeStructuresService.update(id, updatePrizeStructureDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.prizeStructuresService.remove(id);
  }
}
