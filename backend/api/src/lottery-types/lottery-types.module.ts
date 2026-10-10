import { Module } from '@nestjs/common';
import { LotteryTypesService } from './lottery-types.service.js';
import { LotteryTypesController } from './lottery-types.controller.js';

@Module({
  controllers: [LotteryTypesController],
  providers: [LotteryTypesService],
})
export class LotteryTypesModule {}
