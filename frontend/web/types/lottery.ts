export interface LotteryResult {
  id: string;
  stationId: string;
  date: string;
  // Use strings to preserve leading zeros like '01234'
  prizes: {
    special: string[];
    first: string[];
    second: string[];
    third: string[];
    fourth: string[];
    fifth: string[];
    sixth: string[];
    seventh: string[];
    eighth?: string[]; // For some regions
  };
}
