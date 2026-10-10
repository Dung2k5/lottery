import { Controller, Post, Body } from '@nestjs/common';
import { TicketCheckerService } from './ticket-checker.service';
import { CheckTicketDto } from './dto/check-ticket.dto';

@Controller('ticket-checker')
export class TicketCheckerController {
  constructor(private readonly ticketCheckerService: TicketCheckerService) {}

  @Post('check')
  checkTickets(@Body() checkTicketDto: CheckTicketDto) {
    return this.ticketCheckerService.checkTickets(checkTicketDto);
  }
}
