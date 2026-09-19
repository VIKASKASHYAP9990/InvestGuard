import { format, parseISO } from 'date-fns';

export const money = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`;
export const compactMoney = (value: number) => value >= 100000 ? `₹${(value / 100000).toFixed(1)}L` : money(value);
export const dateLabel = (iso: string) => format(parseISO(iso), 'dd MMM yyyy');
export const pct = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
export const uid = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
