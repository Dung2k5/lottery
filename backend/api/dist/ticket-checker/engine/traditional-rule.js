"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTraditionalTicket = checkTraditionalTicket;
exports.checkBatchTraditionalTickets = checkBatchTraditionalTickets;
function checkTraditionalTicket(request) {
    const { ticketNumber, drawSession } = request;
    const matches = [];
    for (const prize of drawSession.results) {
        for (const winningNum of prize.winningNumbers) {
            if (ticketNumber.endsWith(winningNum)) {
                matches.push({
                    prizeCode: prize.prizeCode,
                    prizeName: prize.prizeName,
                    winningNumber: winningNum,
                });
                continue;
            }
            if (prize.prizeCode === 'DB' || prize.prizeCode === 'GDB') {
                if (ticketNumber.length === winningNum.length) {
                    const diffCount = countDifferences(ticketNumber, winningNum);
                    const firstDigitDiff = ticketNumber[0] !== winningNum[0];
                    if (diffCount === 1 && firstDigitDiff) {
                        matches.push({
                            prizeCode: 'PHU_DB',
                            prizeName: 'Giải Phụ Đặc Biệt',
                            winningNumber: winningNum,
                        });
                    }
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
    return {
        ticketNumber,
        isWinner: matches.length > 0,
        matches,
    };
}
function checkBatchTraditionalTickets(ticketNumbers, drawSession) {
    return ticketNumbers.map(ticketNumber => checkTraditionalTicket({ ticketNumber, drawSession }));
}
function countDifferences(str1, str2) {
    let diff = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            diff++;
        }
    }
    return diff;
}
//# sourceMappingURL=traditional-rule.js.map