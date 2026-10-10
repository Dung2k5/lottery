import { Module } from '@nestjs/common';
import { TicketCheckerService } from './ticket-checker.service';
import { TicketCheckerController } from './ticket-checker.controller';

@Module({
  controllers: [TicketCheckerController],
  providers: [TicketCheckerService],
})
export class TicketCheckerModule {}
