import { Module } from '@nestjs/common';
import { PrizeStructuresService } from './prize-structures.service.js';
import { PrizeStructuresController } from './prize-structures.controller.js';

@Module({
  controllers: [PrizeStructuresController],
  providers: [PrizeStructuresService],
})
export class PrizeStructuresModule {}
