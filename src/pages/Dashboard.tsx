
import React, { useEffect, useState } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { Wallet, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    accountsCount: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching transactions:', error);
          return;
        }

        const formattedTransactions: Transaction[] = (data || []).map(transaction => ({
          id: transaction.id.toString(),
          description: transaction.description,
          amount: Number(transaction.amount),
          type: transaction.type as 'income' | 'expense',
          category: transaction.category,
          date: transaction.date,
        }));

        setTransactions(formattedTransactions);

        // Calculate stats
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyTransactions = formattedTransactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getMonth() === currentMonth && 
                 transactionDate.getFullYear() === currentYear;
        });

        const monthlyIncome = monthlyTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        
        const monthlyExpenses = monthlyTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const totalBalance = formattedTransactions.reduce((sum, t) => {
          return t.type === 'income' ? sum + t.amount : sum - Math.abs(t.amount);
        }, 0);

        setStats({
          totalBalance,
          monthlyIncome,
          monthlyExpenses,
          accountsCount: 0, // Will be implemented when accounts feature is added
        });

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  if (loading) {
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
          value={formatCurrency(stats.totalBalance)}
          icon={Wallet}
          variant={stats.totalBalance >= 0 ? 'success' : 'danger'}
        />
        <StatsCard
          title="Receitas do Mês"
          value={formatCurrency(stats.monthlyIncome)}
          icon={TrendingUp}
          variant="success"
        />
        <StatsCard
          title="Despesas do Mês"
          value={formatCurrency(stats.monthlyExpenses)}
          icon={TrendingDown}
          variant="danger"
        />
        <StatsCard
          title="Contas Ativas"
          value={stats.accountsCount.toString()}
          icon={CreditCard}
          variant="default"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions} />
        
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
};
