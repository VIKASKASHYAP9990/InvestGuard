import type { ComponentType, ReactNode } from 'react';
import { ArrowUpRight, CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import type { Level } from '../types';

export const Button = ({ children, variant = 'primary', onClick, type = 'button', disabled = false, className = '' }: { children: ReactNode; variant?: 'primary'|'secondary'|'ghost'|'danger'; onClick?: () => void; type?: 'button'|'submit'; disabled?: boolean; className?: string }) => <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-${variant} ${className}`}>{children}</button>;
export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => <section className={`card ${className}`}>{children}</section>;
export const Badge = ({ level, children }: { level: Level; children?: ReactNode }) => <span className={`badge badge-${level.toLowerCase()}`} aria-label={`Status ${level}`}>{children || level}</span>;
export const PageTitle = ({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) => <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div>{action}</div>}</div>;
export const EmptyState = ({ title, children }: { title: string; children?: ReactNode }) => <div className="empty"><Info size={18} /><div><strong>{title}</strong>{children && <p>{children}</p>}</div></div>;
export const Toast = ({ text, onClose }: { text: string; onClose: () => void }) => <div className="toast"><CheckCircle2 size={18} /><span>{text}</span><button onClick={onClose} aria-label="Close notification"><X size={16}/></button></div>;
export const Stat = ({ label, value, change, icon: Icon }: { label: string; value: string; change?: string; icon: ComponentType<{ size?: number }> }) => <Card className="stat"><div className="stat-top"><span>{label}</span><span className="icon-box"><Icon size={17}/></span></div><strong>{value}</strong>{change && <span className="stat-change">{change}</span>}</Card>;
export const Severity = ({ level }: { level: Level }) => <span className={`severity severity-${level.toLowerCase()}`}><CircleAlert size={13}/>{level}</span>;
