import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateDrawSessionDto } from './dto/create-result.dto';
import { UpdateDrawResultDto } from './dto/update-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(@Body() createResultDto: CreateDrawSessionDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  findAll(
    @Query('date') date?: string,
    @Query('lotteryTypeId') lotteryTypeId?: string,
  ) {
    return this.resultsService.findAll(date, lotteryTypeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.resultsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateResultDto: UpdateDrawResultDto) {
    return this.resultsService.update(id, updateResultDto);
  }

  @Post(':id/publish')
  publish(@Param('id', ParseUUIDPipe) id: string) {
    return this.resultsService.publish(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.resultsService.remove(id);
  }
}
