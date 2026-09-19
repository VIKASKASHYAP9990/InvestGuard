import type { Holding, Transaction } from '../types';
import { gainLoss, holdingValue, totalValue } from './portfolio';

export type AILanguage = 'english' | 'hindi' | 'hinglish';

export interface HoldingPL {
  symbol: string;
  company: string;
  invested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  dailyChange: number;
  portfolioPercentage: number;
}

export interface FinancialSummary {
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  dailyChange: number;
  holdings: number;
  highestProfit?: HoldingPL;
  highestLoss?: HoldingPL;
}

export const calculateProfitLoss = (transactions: Transaction[], holdings: Holding[]): { summary: FinancialSummary; holdings: HoldingPL[] } => {
  const totalInvested = transactions.filter((t) => t.type === 'BUY').reduce((sum, t) => sum + t.quantity * t.price, 0);
  const currentValue = totalValue(holdings);
  const total = currentValue || 1;
  const details = holdings.map((h) => {
    const invested = h.quantity * h.avgBuyPrice;
    const current = holdingValue(h);
    const profitLoss = current - invested;
    return { symbol: h.symbol, company: h.company, invested, currentValue: current, profitLoss, profitLossPercentage: invested ? profitLoss / invested * 100 : 0, dailyChange: current * .009, portfolioPercentage: current / total * 100 };
  });
  const profitSorted = [...details].sort((a, b) => b.profitLoss - a.profitLoss);
  const lossSorted = [...details].sort((a, b) => a.profitLoss - b.profitLoss);
  const profitLoss = currentValue - totalInvested;
  return { holdings: details, summary: { totalInvested, currentValue, profitLoss, profitLossPercentage: totalInvested ? profitLoss / totalInvested * 100 : 0, dailyChange: currentValue * .009, holdings: holdings.length, highestProfit: profitSorted[0], highestLoss: lossSorted[0] } };
};
