import { PrismaService } from '../prisma/prisma.service';
import { CheckTicketDto } from './dto/check-ticket.dto';
export declare class TicketCheckerService {
    private prisma;
    constructor(prisma: PrismaService);
    checkTickets(dto: CheckTicketDto): Promise<{
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
