export interface LotoSummary {
    heads: Record<string, string[]>;
    tails: Record<string, string[]>;
}
export interface PrizeWithWinningNumbers {
    winningNumbers: string[];
}
export declare function extractLotoSummary(prizeResults: PrizeWithWinningNumbers[]): LotoSummary;
