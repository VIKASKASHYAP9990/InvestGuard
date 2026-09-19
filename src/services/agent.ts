import { explainDaily, explainHolding, explainPortfolio } from './aiProfitLoss';
import { calculateProfitLoss, type AILanguage } from './profitLoss';
import { holdingInsight } from './aiInsights';
import type { AppState } from '../types';

export const answerAgent = (question: string, state: Pick<AppState, 'transactions' | 'holdings' | 'config' | 'alerts' | 'patterns'>, language: AILanguage = 'english') => {
  const q = question.toLowerCase();
  const calculated = calculateProfitLoss(state.transactions, state.holdings);
  if (q.includes('profit') || q.includes('loss') || q.includes('p/l') || q.includes('return')) return explainPortfolio(language, calculated.summary);
  if (q.includes('today') || q.includes('daily') || q.includes('change')) return explainDaily(language, calculated.summary.dailyChange, calculated.summary.currentValue);
  if (q.includes('highest') || q.includes('best') || q.includes('worst')) {
    const best = calculated.summary.highestProfit; const worst = calculated.summary.highestLoss;
    if (language === 'hindi') return `सबसे अधिक लाभ वाला होल्डिंग ${best?.symbol || 'उपलब्ध नहीं'} है (${best ? explainHolding(language, best) : 'डेटा उपलब्ध नहीं'})। सबसे बड़ा नुकसान ${worst?.symbol || 'उपलब्ध नहीं'} में दिख रहा है।`;
    if (language === 'hinglish') return `Highest profit ${best?.symbol || 'available nahi'} mein hai. ${best ? explainHolding(language, best) : ''} Highest loss ${worst?.symbol || 'available nahi'} mein dikh raha hai.`;
    return `The highest current profit is in ${best?.symbol || 'not available'}. ${best ? explainHolding(language, best) : ''} The largest current loss is in ${worst?.symbol || 'not available'}.`;
  }
  if (q.includes('risk') || q.includes('concentration') || q.includes('safe')) {
    const signals = state.holdings.map((h) => holdingInsight(h, state.holdings, state.config)).filter((i) => i.risk !== 'LOW');
    return signals.length ? `I found ${signals.length} elevated rule-based risk signal${signals.length > 1 ? 's' : ''}: ${signals.map((s) => s.riskReason).join(' ')} These are activity signals, not a forecast or a recommendation.` : 'No elevated concentration or drawdown signal was found in the current portfolio data. This is not a prediction of future performance.';
  }
  if (q.includes('alert') || q.includes('signal') || q.includes('behavior')) return state.alerts.length ? `${state.alerts.filter((a) => a.status === 'NEW').length} new alerts are ready to review. The most recent signal is “${state.alerts[0].title}”: ${state.alerts[0].evidence[0]}` : 'There are no active alerts in the current data.';
  if (q.includes('holding') || q.includes('portfolio')) return `Your portfolio has ${calculated.summary.holdings} holdings and a current value of ₹${Math.round(calculated.summary.currentValue).toLocaleString('en-IN')}. I can explain profit/loss, today’s change, holdings, or rule-based risk signals.`;
  return 'I can explain your profit/loss, today’s change, highest profit or loss, holdings, alerts, and rule-based risk signals. Try one of the suggested questions below.';
};
