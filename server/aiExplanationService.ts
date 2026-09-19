import type { AILanguage, FinancialSummary } from '../src/services/profitLoss';
import { explainPortfolio } from '../src/services/aiProfitLoss';

/** Backend-ready service used by POST /api/ai/profit-loss-explain. No API key is exposed to React. */
export const AIExplanationService = {
  explain(language: AILanguage, financialSummary: FinancialSummary) {
    return { language, explanation: explainPortfolio(language, financialSummary) };
  },
};
