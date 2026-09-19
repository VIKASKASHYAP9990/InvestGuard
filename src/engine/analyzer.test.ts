import { describe, expect, it } from 'vitest';
import { analyze } from './analyzer';
import { defaultConfig, demoHoldings, demoJournal, demoTransactions, seedPriceHistory, today } from '../lib/mockData';

describe('InvestGuard behavior engine', () => {
  it('returns deterministic, evidence-backed demo patterns', () => {
    const input = [demoTransactions, demoHoldings, seedPriceHistory(), demoJournal, defaultConfig, today] as const;
    const first = analyze(...input);
    const second = analyze(...input);
    expect(first).toEqual(second);
    expect(first.alerts.length).toBeGreaterThanOrEqual(5);
    expect(first.alerts.every((a) => a.evidence.length > 0 && a.reflectionQuestion.length > 0)).toBe(true);
  });

  it('does not emit a pattern for empty data', () => {
    const result = analyze([], [], {}, [], defaultConfig, today);
    expect(result.alerts).toHaveLength(0);
  });
});
