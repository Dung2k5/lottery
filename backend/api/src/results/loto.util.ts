export interface LotoSummary {
  heads: Record<string, string[]>;
  tails: Record<string, string[]>;
}

export interface PrizeWithWinningNumbers {
  winningNumbers: string[];
}

export function extractLotoSummary(prizeResults: PrizeWithWinningNumbers[]): LotoSummary {
  const heads: Record<string, string[]> = {};
  const tails: Record<string, string[]> = {};

  for (let i = 0; i <= 9; i++) {
    const key = String(i);
    heads[key] = [];
    tails[key] = [];
  }

  if (Array.isArray(prizeResults)) {
    for (const prize of prizeResults) {
      if (!prize.winningNumbers || !Array.isArray(prize.winningNumbers)) continue;
      for (const num of prize.winningNumbers) {
        if (typeof num === 'string' && num.length >= 2) {
          const loto = num.slice(-2);
          const head = loto[0];
          const tail = loto[1];
          if (heads[head]) heads[head].push(loto);
          if (tails[tail]) tails[tail].push(loto);
        }
      }
    }
  }

  for (let i = 0; i <= 9; i++) {
    const key = String(i);
    heads[key].sort();
    tails[key].sort();
  }

  return { heads, tails };
}
