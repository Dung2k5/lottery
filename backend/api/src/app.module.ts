import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LotteryTypesModule } from './lottery-types/lottery-types.module.js';
import { PrizeStructuresModule } from './prize-structures/prize-structures.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RegionsModule } from './regions/regions.module';
import { ProvincesModule } from './provinces/provinces.module';
import { StationsModule } from './stations/stations.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [LotteryTypesModule, PrizeStructuresModule, PrismaModule, RegionsModule, ProvincesModule, StationsModule, SchedulesModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
