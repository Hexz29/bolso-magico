
import React, { useMemo, useCallback } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { Wallet, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { useOptimizedTransactions } from '@/hooks/useOptimizedTransactions';


export const Dashboard: React.FC = React.memo(() => {
  const { data: transactions, isLoading, stats } = useOptimizedTransactions(10);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 skeleton rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 skeleton rounded-xl" />
          <div className="h-96 skeleton rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">
          Bem-vindo de volta! Aqui está um resumo das suas finanças.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Saldo Total"
          value={formatCurrency(stats?.totalBalance || 0)}
          icon={Wallet}
          variant={(stats?.totalBalance || 0) >= 0 ? 'success' : 'danger'}
        />
        <StatsCard
          title="Receitas do Mês"
          value={formatCurrency(stats?.monthlyIncome || 0)}
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard
          title="Despesas do Mês"
          value={formatCurrency(stats?.monthlyExpenses || 0)}
          icon={TrendingDown}
          variant="danger"
        />
        <StatsCard
          title="Total Transações"
          value={(stats?.totalTransactions || 0).toString()}
          icon={CreditCard}
          variant="default"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        
        {/* Placeholder for future charts */}
        <div className="financial-card p-6 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Gráficos em breve</p>
              <p className="text-sm text-muted-foreground">
                Visualize suas finanças com gráficos interativos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
