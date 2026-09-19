import type { Holding, Transaction } from '../types';

export const holdingsFromTransactions = (transactions: Transaction[], catalog: Holding[]) => catalog.map((base) => {
  const relevant = transactions.filter((t) => t.symbol === base.symbol);
  const buys = relevant.filter((t) => t.type === 'BUY');
  const sells = relevant.filter((t) => t.type === 'SELL');
  const quantity = buys.reduce((s, t) => s + t.quantity, 0) - sells.reduce((s, t) => s + t.quantity, 0);
  const cost = buys.reduce((s, t) => s + t.quantity * t.price, 0);
  return { ...base, quantity: Math.max(0, quantity), avgBuyPrice: buys.length ? cost / Math.max(1, buys.reduce((s, t) => s + t.quantity, 0)) : base.avgBuyPrice };
}).filter((h) => h.quantity > 0);

export const holdingValue = (h: Holding) => h.quantity * h.currentPrice;
export const gainLoss = (h: Holding) => holdingValue(h) - h.quantity * h.avgBuyPrice;
export const totalValue = (holdings: Holding[]) => holdings.reduce((s, h) => s + holdingValue(h), 0);
export const allocation = (holdings: Holding[]) => { const total = totalValue(holdings) || 1; return holdings.map((h) => ({ name: h.symbol, value: holdingValue(h), percent: holdingValue(h) / total * 100 })); };
export const sectorExposure = (holdings: Holding[]) => { const map = new Map<string, number>(); holdings.forEach((h) => map.set(h.sector, (map.get(h.sector) || 0) + holdingValue(h))); const total = totalValue(holdings) || 1; return [...map].map(([name, value]) => ({ name, value, percent: value / total * 100 })).sort((a, b) => b.value - a.value); };
export const transactionCount = (transactions: Transaction[], days: number, today = new Date()) => { const cutoff = new Date(today); cutoff.setDate(cutoff.getDate() - days); return transactions.filter((t) => new Date(t.date) >= cutoff).length; };
