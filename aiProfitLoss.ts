import type { AILanguage, FinancialSummary, HoldingPL } from './profitLoss';
import { money, pct } from '../lib/format';

const amount = (value: number) => `${value >= 0 ? '+' : '-'}${money(Math.abs(value))}`;
const resultWords = (value: number, language: AILanguage) => {
  if (language === 'hindi') return value > 0 ? 'लाभ' : value < 0 ? 'नुकसान' : 'कोई लाभ या नुकसान नहीं';
  if (language === 'hinglish') return value > 0 ? 'profit' : value < 0 ? 'loss' : 'no profit ya loss';
  return value > 0 ? 'profit' : value < 0 ? 'loss' : 'no profit or loss';
};

export const explainPortfolio = (language: AILanguage, summary: FinancialSummary) => {
  const value = money(summary.currentValue); const invested = money(summary.totalInvested); const result = money(Math.abs(summary.profitLoss)); const percentage = pct(summary.profitLossPercentage); const word = resultWords(summary.profitLoss, language);
  if (language === 'hindi') return `आपके पोर्टफोलियो की वर्तमान वैल्यू ${value} है।\n\nआपने कुल ${invested} निवेश किए हैं।\n\nआपके पोर्टफोलियो में वर्तमान में ${result} का ${word} है, जो आपकी निवेश राशि का ${percentage} है।`;
  if (language === 'hinglish') return `Aapke portfolio ki current value ${value} hai.\n\nAapne total ${invested} invest kiye hain.\n\nAbhi aap ${result} ke ${word} mein ho, jo aapke invested amount par ${percentage} ka change hai.`;
  return `Your portfolio is currently valued at ${value}.\n\nYou invested ${invested}.\n\nYour current ${word} is ${result}, which represents a ${percentage} change from your invested amount.`;
};

export const explainHolding = (language: AILanguage, holding: HoldingPL) => {
  const invested = money(holding.invested); const current = money(holding.currentValue); const result = money(Math.abs(holding.profitLoss)); const percentage = pct(holding.profitLossPercentage); const word = resultWords(holding.profitLoss, language);
  if (language === 'hindi') return `आपने ${holding.symbol} में ${invested} निवेश किए थे और इसकी वर्तमान वैल्यू ${current} है। आपको ${result} का ${word} हुआ है, यानी ${percentage}।`;
  if (language === 'hinglish') return `Aapne ${holding.symbol} mein ${invested} invest kiye the aur ab iska value ${current} hai. Aapko ${result} ka ${word} hua hai, yani ${percentage}.`;
  return `You invested ${invested} in ${holding.symbol} and its current value is ${current}, resulting in a ${word} of ${result} or ${percentage}.`;
};

export const explainDaily = (language: AILanguage, dailyChange: number, currentValue: number) => {
  const dailyPct = currentValue ? dailyChange / currentValue * 100 : 0;
  if (language === 'hindi') return `आज आपके पोर्टफोलियो की वैल्यू ${money(Math.abs(dailyChange))} बढ़ी है, जो पिछली वैल्यू की तुलना में ${pct(dailyPct)} की वृद्धि है।`;
  if (language === 'hinglish') return `Aaj aapke portfolio ki value ${money(Math.abs(dailyChange))} increase hui hai, yani previous value se ${pct(dailyPct)} ka change hua hai.`;
  return `Your portfolio increased by ${money(Math.abs(dailyChange))} today, representing a ${pct(dailyPct)} change from the previous value.`;
};

export const requestAIExplanation = async (language: AILanguage, summary: FinancialSummary) => {
  try {
    const response = await fetch('/api/ai/profit-loss-explain', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ language, financial_summary: summary }) });
    if (response.ok) { const data = await response.json() as { explanation?: string }; if (data.explanation) return data.explanation; }
  } catch { /* Offline-first fallback is intentional. */ }
  return explainPortfolio(language, summary);
};
