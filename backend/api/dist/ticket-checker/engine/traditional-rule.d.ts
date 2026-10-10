import { TicketCheckRequest, TicketCheckResponse, DrawSessionData } from './types';
export declare function checkTraditionalTicket(request: TicketCheckRequest): TicketCheckResponse;
export declare function checkBatchTraditionalTickets(ticketNumbers: string[], drawSession: DrawSessionData): TicketCheckResponse[];
