export const disclaimer = 'InvestGuard is an educational technology project. Behavioral indicators are based on transaction and portfolio patterns and do not establish a user’s emotions or psychological state. This application does not provide financial advice, investment recommendations, or guaranteed returns.';

export const patternCopy = {
  fomo: { title: 'Possible FOMO-like buying pattern', short: 'FOMO-like buying', reflection: 'Was this purchase part of your original investment plan?', rule: 'A buy occurred within 3 days of a 10%+ price rise over the prior 5 days.' },
  overtrading: { title: 'Potential overtrading pattern', short: 'Overtrading', reflection: 'Was each trade part of a predefined strategy?', rule: 'At least 5 transactions occurred within 7 days and activity was above the usual baseline.' },
  concentration: { title: 'Concentration alert', short: 'Concentration', reflection: 'Does this allocation match your intended investment strategy?', rule: 'One holding represents at least 30% of the portfolio value.' },
  panic: { title: 'Possible short-term reaction pattern', short: 'Short-term reaction', reflection: 'Did the underlying reason for owning this investment change?', rule: 'A sell occurred within 3 days of an 8%+ price decline over the prior 5 days.' },
  lossAversion: { title: 'Possible loss-aversion pattern', short: 'Loss-aversion', reflection: 'Are you holding because it still fits your plan, or because you want to return to your original purchase price?', rule: 'An open position is down 15%+, held for 30+ days, and its linked thesis is marked changed.' },
  timing: { title: 'Potential market-timing pattern', short: 'Market timing', reflection: 'Are these trades part of a predefined strategy?', rule: 'At least 3 recent trades followed short-term price movements of 5%+.' },
} as const;

export type PatternKey = keyof typeof patternCopy;

export const learnCopy = [
  ['What is FOMO?', 'Buying after a sharp move because an opportunity feels urgent.', 'InvestGuard checks whether a buy followed a measured price rise; it cannot establish why you acted.'],
  ['What is panic selling?', 'Selling after a decline before revisiting the original thesis.', 'InvestGuard surfaces short-term reaction signals using price history and timing.'],
  ['What is overtrading?', 'Making more trades than your usual rhythm over a short window.', 'The engine compares a rolling count with your own recent baseline.'],
  ['What is concentration risk?', 'Having a large share of portfolio value in one holding or sector.', 'InvestGuard shows the math so you can compare it with your intended allocation.'],
  ['What is loss aversion?', 'Holding a declining position mainly to avoid realizing a loss.', 'This indicator needs both price evidence and a changed-thesis journal update.'],
  ['What is market timing?', 'Repeatedly trading around short-term price moves.', 'The engine looks for clusters of trades near measured moves, not emotions.'],
  ['What is diversification?', 'Spreading exposure across holdings, sectors, and asset types.', 'The portfolio views make exposure visible so you can reflect on balance.'],
  ['What is an investment thesis?', 'A written reason and time horizon for an investment.', 'Writing it first creates a reference point for later reflection.'],
];
