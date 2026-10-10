import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { DrawsController } from './draws.controller';

@Module({
  controllers: [ResultsController, DrawsController],
  providers: [ResultsService],
})
export class ResultsModule {}
