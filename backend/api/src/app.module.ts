import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LotteryTypesModule } from './lottery-types/lottery-types.module.js';
import { PrizeStructuresModule } from './prize-structures/prize-structures.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [LotteryTypesModule, PrizeStructuresModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
