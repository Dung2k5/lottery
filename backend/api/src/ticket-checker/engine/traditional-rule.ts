import { TicketCheckRequest, TicketCheckResponse, PrizeMatchResult, DrawSessionData } from './types';

export function checkTraditionalTicket(request: TicketCheckRequest): TicketCheckResponse {
  const { ticketNumber, drawSession } = request;
  const matches: PrizeMatchResult[] = [];

  for (const prize of drawSession.results) {
    for (const winningNum of prize.winningNumbers) {
      // 1. So khớp chuẩn (Right-aligned match)
      if (ticketNumber.endsWith(winningNum)) {
        matches.push({
          prizeCode: prize.prizeCode,
          prizeName: prize.prizeName,
          winningNumber: winningNum,
        });
        continue;
      }

      // 2. Xét Giải Phụ Đặc Biệt và Khuyến Khích (áp dụng cho vé và giải ĐB có cùng độ dài, thường là 6 số XSMN/XSMT, hoặc 5 số XSMB)
      if (prize.prizeCode === 'DB' || prize.prizeCode === 'GDB') {
        if (ticketNumber.length === winningNum.length) {
          const diffCount = countDifferences(ticketNumber, winningNum);
          const firstDigitDiff = ticketNumber[0] !== winningNum[0];

          // Giải Phụ Đặc Biệt: sai duy nhất chữ số đầu tiên (đúng 5 số cuối của giải 6 số, hoặc đúng 4 số cuối của giải 5 số)
          if (diffCount === 1 && firstDigitDiff) {
            matches.push({
              prizeCode: 'PHU_DB',
              prizeName: 'Giải Phụ Đặc Biệt',
              winningNumber: winningNum,
            });
          }
          // Giải Khuyến Khích: sai duy nhất 1 chữ số, NHƯNG KHÔNG PHẢI chữ số đầu tiên
          else if (diffCount === 1 && !firstDigitDiff) {
            matches.push({
              prizeCode: 'KHUYEN_KHICH',
              prizeName: 'Giải Khuyến Khích',
              winningNumber: winningNum,
            });
          }
        }
      }
    }
  }

  // Sort matches by some logical order if needed, but for now just return them
  return {
    ticketNumber,
    isWinner: matches.length > 0,
    matches,
  };
}

export function checkBatchTraditionalTickets(ticketNumbers: string[], drawSession: DrawSessionData): TicketCheckResponse[] {
  return ticketNumbers.map(ticketNumber => checkTraditionalTicket({ ticketNumber, drawSession }));
}

function countDifferences(str1: string, str2: string): number {
  let diff = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      diff++;
    }
  }
  return diff;
}
