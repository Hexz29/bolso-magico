
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  trend?: 'up' | 'down' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  variant = 'default',
  trend = 'neutral'
}) => {
  const variantStyles = {
    default: 'from-slate-500 to-slate-600',
    success: 'from-emerald-500 to-emerald-600',
    danger: 'from-red-500 to-red-600',
    warning: 'from-amber-500 to-amber-600',
  };

  const trendStyles = {
    up: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    down: 'text-red-600 bg-red-50 border-red-200',
    neutral: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  return (
    <Card className="stat-card overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-currency tracking-tight">{value}</p>
            {change && (
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${trendStyles[trend]}`}>
                {change}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${variantStyles[variant]} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
