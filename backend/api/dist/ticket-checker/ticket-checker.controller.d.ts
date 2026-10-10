import { TicketCheckerService } from './ticket-checker.service';
import { CheckTicketDto } from './dto/check-ticket.dto';
export declare class TicketCheckerController {
    private readonly ticketCheckerService;
    constructor(ticketCheckerService: TicketCheckerService);
    checkTickets(checkTicketDto: CheckTicketDto): Promise<{
        status: string;
        message: string;
        drawInfo?: undefined;
        results?: undefined;
    } | {
        status: string;
        drawInfo: {
            lotteryName: string;
            stationName: string | undefined;
            drawDate: string;
            status: "PUBLISHED" | "REVISED";
        };
        results: import("./engine/types").TicketCheckResponse[];
        message?: undefined;
    }>;
}
