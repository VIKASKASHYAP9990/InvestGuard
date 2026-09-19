import { addDays, format, subDays } from 'date-fns';
import type { AssetType, DetectionConfig, Holding, JournalEntry, Transaction } from '../types';

const today = new Date();
const iso = (d: Date) => format(d, 'yyyy-MM-dd');
const d = (daysAgo: number) => iso(subDays(today, daysAgo));
const tx = (id: string, symbol: string, company: string, type: 'BUY'|'SELL', quantity: number, price: number, daysAgo: number, reason: string, hold: string): Transaction => ({ id, symbol, company, type, quantity, price, date: d(daysAgo), reason, expectedHoldingPeriod: hold });

export const defaultConfig: DetectionConfig = { lookbackDays: 5, reactionWindowDays: 3, fomoRunUpPct: 10, panicDropPct: 8, timingMovePct: 5, concentrationPct: 30, lossAversionDrawdownPct: 15, lossAversionMinHoldDays: 30, overtradingCount: 5, overtradingWindowDays: 7, marketTimingMinTrades: 3 };

const companies: Record<string, [string, string, number]> = { NOVA: ['Nova Systems', 'Technology', 150], AXIS: ['Axis Consumer', 'Consumer', 118], RIVER: ['River Finance', 'Finance', 86], AURA: ['Aura Health', 'Healthcare', 154], GLIDE: ['Glide Mobility', 'Industrials', 72], ORBIT: ['Orbit ETF', 'Technology', 124], VISTA: ['Vista Bonds', 'Finance', 102] };

export const seedPriceHistory = () => Object.fromEntries(Object.entries(companies).map(([symbol, [, , base]]) => {
  const values = Array.from({ length: 181 }, (_, i) => { const day = subDays(today, 180 - i); const wave = Math.sin(i / 9) * 0.018 + Math.cos(i / 17) * 0.01; return { date: iso(day), close: +(base * (1 + wave + i * 0.0002)).toFixed(2) }; });
  const override = (daysAgo: number, value: number) => { const point = values.find((p) => p.date === d(daysAgo)); if (point) point.close = value; };
  if (symbol === 'ORBIT') { override(19, base * 0.88); override(14, base * 1.08); }
  if (symbol === 'GLIDE') { override(15, base * 1.12); override(10, base * 0.88); }
  if (symbol === 'AXIS') { override(9, base * 0.94); override(4, base * 1.06); override(8, base * 0.94); override(3, base * 1.06); }
  if (symbol === 'RIVER') { override(7, base * 0.94); override(2, base * 1.06); override(6, base * 1.06); override(1, base * 0.94); }
  return [symbol, values];
}));

export const demoTransactions: Transaction[] = [
  tx('t_base_1', 'AXIS', companies.AXIS[0], 'BUY', 80, 98, 140, 'Long-term growth', '1–3 years'),
  tx('t_base_2', 'RIVER', companies.RIVER[0], 'BUY', 100, 78, 115, 'Dividend', '1–3 years'),
  tx('t_base_3', 'AURA', companies.AURA[0], 'BUY', 45, 142, 88, 'Valuation', '6–12 months'),
  tx('t_conc', 'NOVA', companies.NOVA[0], 'BUY', 210, 196, 75, 'Portfolio allocation', '1–3 years'),
  tx('t_fomo', 'ORBIT', companies.ORBIT[0], 'BUY', 55, 135, 14, 'Short-term opportunity', '1–6 months'),
  tx('t_panic', 'GLIDE', companies.GLIDE[0], 'SELL', 12, 68, 10, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_timing_1', 'AXIS', companies.AXIS[0], 'BUY', 12, 122, 4, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_timing_2', 'AXIS', companies.AXIS[0], 'SELL', 12, 126, 3, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_timing_3', 'RIVER', companies.RIVER[0], 'BUY', 15, 91, 2, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_timing_4', 'RIVER', companies.RIVER[0], 'SELL', 15, 88, 1, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_burst_1', 'AURA', companies.AURA[0], 'BUY', 4, 152, 5, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_burst_2', 'AURA', companies.AURA[0], 'SELL', 2, 151, 4, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_burst_3', 'AXIS', companies.AXIS[0], 'BUY', 3, 121, 3, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_burst_4', 'AXIS', companies.AXIS[0], 'SELL', 2, 123, 2, 'Short-term opportunity', 'Less than 1 month'),
  tx('t_burst_5', 'ORBIT', companies.ORBIT[0], 'BUY', 3, 142, 1, 'Short-term opportunity', 'Less than 1 month'),
];

export const demoHoldings: Holding[] = Object.entries(companies).map(([symbol, [company, sector, currentPrice]]) => ({ symbol, company, quantity: symbol === 'NOVA' ? 210 : symbol === 'AXIS' ? 80 : symbol === 'RIVER' ? 100 : symbol === 'AURA' ? 45 : symbol === 'GLIDE' ? 8 : symbol === 'ORBIT' ? 61 : 0, avgBuyPrice: symbol === 'NOVA' ? 196 : symbol === 'AXIS' ? 98 : symbol === 'RIVER' ? 78 : symbol === 'AURA' ? 142 : symbol === 'GLIDE' ? 72 : symbol === 'ORBIT' ? 138 : 102, currentPrice, sector, assetType: (symbol === 'ORBIT' ? 'ETFs' : symbol === 'VISTA' ? 'Bonds' : 'Stocks') as AssetType })).filter((h) => h.quantity > 0);

export const demoJournal: JournalEntry[] = [{ id: 'j_nova', symbol: 'NOVA', whyInvesting: 'Long-term growth', thesis: 'Long-term investment based on company fundamentals and product adoption.', expectedHorizon: '1–3 years', reconsiderIf: 'Material change to product growth or balance sheet.', updates: [{ date: d(2), whatHappened: 'Price moved lower while I continued holding.', thesisChanged: true, whyBuySell: 'The original thesis needs review after the latest results.', consistentWithPlan: false }] }];

export const freshDemo = () => ({ transactions: demoTransactions, holdings: demoHoldings, journal: demoJournal, priceHistory: seedPriceHistory() });

export { companies, today };
