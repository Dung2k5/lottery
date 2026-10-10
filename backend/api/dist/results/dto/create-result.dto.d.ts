export declare class PrizeResultDto {
    prizeCode: string;
    prizeName: string;
    winningNumbers: string[];
    order?: number;
}
export declare class CreateDrawSessionDto {
    lotteryTypeId: string;
    stationId?: string;
    drawDate: string;
    drawCode?: string;
    dataSourceId?: string;
    results: PrizeResultDto[];
}
