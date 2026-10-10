export interface DrawSessionData {
  drawDate: string;
  lotteryTypeCode: string;
  stationCode?: string;
  results: {
    prizeCode: string;
    prizeName: string;
    winningNumbers: string[];
  }[];
}

export interface TicketCheckRequest {
  ticketNumber: string;
  drawSession: DrawSessionData;
}

export interface PrizeMatchResult {
  prizeCode: string;
  prizeName: string;
  winningNumber: string;
  prizeValue?: string;
}

export interface TicketCheckResponse {
  ticketNumber: string;
  isWinner: boolean;
  matches: PrizeMatchResult[];
  message?: string;
}

export interface BatchTicketCheckRequest {
  ticketNumbers: string[];
  drawSession: DrawSessionData;
}

export interface BatchTicketCheckResponse {
  tickets: TicketCheckResponse[];
}
