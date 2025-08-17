
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const Transactions: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Transações</h1>
          <p className="text-slate-600">
            Gerencie todas as suas transações financeiras.
          </p>
        </div>
        <Button className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      <div className="financial-card p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Funcionalidade em desenvolvimento</h3>
        <p className="text-muted-foreground mb-6">
          A página de transações será implementada em breve com todas as funcionalidades.
        </p>
        <Button className="btn-gradient" disabled>
          Em breve
        </Button>
      </div>
    </div>
  );
};
