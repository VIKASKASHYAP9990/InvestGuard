export type TradeType = 'BUY' | 'SELL';
export type PatternType = 'fomo' | 'overtrading' | 'concentration' | 'panic' | 'lossAversion' | 'timing';
export type Level = 'LOW' | 'MODERATE' | 'HIGH';
export type AlertStatus = 'NEW' | 'REVIEWED' | 'DISMISSED';
export type AssetType = 'Stocks' | 'ETFs' | 'Bonds' | 'Cash';

export interface Holding { symbol: string; company: string; quantity: number; avgBuyPrice: number; currentPrice: number; sector: string; assetType: AssetType; }
export interface Transaction { id: string; symbol: string; company: string; type: TradeType; quantity: number; price: number; date: string; reason: string; expectedHoldingPeriod: string; }
export interface JournalUpdate { date: string; whatHappened: string; thesisChanged: boolean; whyBuySell: string; consistentWithPlan: boolean; }
export interface JournalEntry { id: string; symbol: string; whyInvesting: string; thesis: string; expectedHorizon: string; reconsiderIf: string; updates: JournalUpdate[]; }
export interface EvidenceAlert { id: string; patternType: PatternType; severity: Level; detectedAt: string; title: string; explanation: string; evidence: string[]; relatedTransactionIds: string[]; reflectionQuestion: string; status: AlertStatus; }
export interface BehaviorPattern { type: PatternType; level: Level; relevantTransactionIds: string[]; rule: string; evidence: string[]; explanation: string; reflectionQuestion: string; detectedDates: string[]; }
export interface DetectionConfig { lookbackDays: number; reactionWindowDays: number; fomoRunUpPct: number; panicDropPct: number; timingMovePct: number; concentrationPct: number; lossAversionDrawdownPct: number; lossAversionMinHoldDays: number; overtradingCount: number; overtradingWindowDays: number; marketTimingMinTrades: number; }
export interface AppState { isAuthenticated: boolean; isDemo: boolean; profile: { name: string; email: string }; transactions: Transaction[]; priceHistory: Record<string, { date: string; close: number }[]>; holdings: Holding[]; journal: JournalEntry[]; alerts: EvidenceAlert[]; patterns: BehaviorPattern[]; config: DetectionConfig; theme: 'light' | 'dark'; }
