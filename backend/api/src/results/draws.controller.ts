import { Controller, Get, Query } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('draws')
export class DrawsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('by-date')
  async getDrawsByDate(
    @Query('date') dateString: string,
    @Query('regionCode') regionCode?: string,
  ) {
    if (!dateString) {
      dateString = new Date().toISOString().split('T')[0];
    }
    return this.resultsService.getPublicDrawsByDate(dateString, regionCode);
  }

  @Get('latest')
  async getLatestDraws(@Query('regionCode') regionCode?: string) {
    return this.resultsService.getLatestPublicDraws(regionCode);
  }
}
