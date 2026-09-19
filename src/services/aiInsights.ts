import type { DetectionConfig, Holding, Level } from '../types';
import { gainLoss, holdingValue, totalValue } from './portfolio';

export interface HoldingInsight { risk: Level; riskLabel: string; riskReason: string; pnl: number; pnlPct: number; allocationPct: number; }

/** Offline AI-style explanation: deterministic, explainable, and not a forecast. */
export const holdingInsight = (holding: Holding, holdings: Holding[], config: DetectionConfig): HoldingInsight => {
  const total = totalValue(holdings) || 1;
  const cost = holding.quantity * holding.avgBuyPrice || 1;
  const pnl = gainLoss(holding);
  const pnlPct = pnl / cost * 100;
  const allocationPct = holdingValue(holding) / total * 100;
  if (allocationPct >= config.concentrationPct || pnlPct <= -config.lossAversionDrawdownPct) return { risk: 'HIGH', riskLabel: 'High signal', riskReason: allocationPct >= config.concentrationPct ? `Allocation is ${allocationPct.toFixed(0)}%, above the ${config.concentrationPct}% concentration threshold.` : `Current drawdown is ${Math.abs(pnlPct).toFixed(1)}%, above the configured review threshold.`, pnl, pnlPct, allocationPct };
  if (allocationPct >= config.concentrationPct * .65 || pnlPct < 0) return { risk: 'MODERATE', riskLabel: 'Moderate signal', riskReason: pnlPct < 0 ? `Current value is ${Math.abs(pnlPct).toFixed(1)}% below average cost.` : `Allocation is ${allocationPct.toFixed(0)}% of the portfolio.` , pnl, pnlPct, allocationPct };
  return { risk: 'LOW', riskLabel: 'No elevated signal', riskReason: 'No elevated concentration or drawdown signal in the current data.', pnl, pnlPct, allocationPct };
};
