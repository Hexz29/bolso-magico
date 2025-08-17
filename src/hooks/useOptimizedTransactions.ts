import { useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useCache } from '@/hooks/useCache';
import { Transaction, validateTransaction } from '@/lib/validations';

export const useOptimizedTransactions = (limit?: number) => {
  const { user } = useAuth();
  const { handleAsyncError } = useErrorHandler();
  const cache = useCache<Transaction[]>({ ttl: 2 * 60 * 1000 }); // 2 minutes cache

  const cacheKey = useMemo(() => 
    `transactions_${user?.id}_${limit || 'all'}`, 
    [user?.id, limit]
  );

  const fetchTransactions = useCallback(async (): Promise<Transaction[]> => {
    if (!user) return [];

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const result = await handleAsyncError(async () => {
      let query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Erro ao carregar transações: ${error.message}`);
      }

      // Validate and format transactions
      const validTransactions: Transaction[] = [];
      
      for (const transaction of data || []) {
        const validation = validateTransaction({
          ...transaction,
          amount: Number(transaction.amount)
        });
        
        if (validation.success) {
          validTransactions.push(validation.data);
        }
      }

      return validTransactions;
    }, {
      fallbackMessage: 'Erro ao carregar transações. Tente novamente.'
    });

    if (result) {
      // Cache the result
      cache.set(cacheKey, result);
      return result;
    }

    return [];
  }, [user, limit, handleAsyncError, cache, cacheKey]);

  const queryResult = useQuery({
    queryKey: ['transactions', user?.id, limit],
    queryFn: fetchTransactions,
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Memoized calculations
  const stats = useMemo(() => {
    const transactions = queryResult.data || [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyTransactions = transactions.filter(t => {
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

    const totalBalance = transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - Math.abs(t.amount);
    }, 0);

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      monthlyTransactions,
      totalTransactions: transactions.length,
    };
  }, [queryResult.data]);

  const invalidateCache = useCallback(() => {
    cache.remove(cacheKey);
  }, [cache, cacheKey]);

  return {
    ...queryResult,
    stats,
    invalidateCache,
  };
};
