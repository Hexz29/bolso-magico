
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions, CreateTransactionData, Transaction } from '@/hooks/useTransactions';
import { toast } from 'sonner';

interface TransactionFormProps {
  transaction?: Transaction;
  onClose?: () => void;
}

const categories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Serviços',
  'Investimentos',
  'Salário',
  'Freelance',
  'Vendas',
  'Outros'
];

export const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onClose }) => {
  const { createTransaction, updateTransaction, isCreating, isUpdating } = useTransactions();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<CreateTransactionData>({
    defaultValues: transaction ? {
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
    } : {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    }
  });

  const watchedType = watch('type');

  const onSubmit = async (data: CreateTransactionData) => {
    try {
      const amount = data.type === 'expense' ? -Math.abs(data.amount) : Math.abs(data.amount);
      
      if (transaction) {
        updateTransaction({ 
          id: transaction.id, 
          ...data, 
          amount 
        });
        toast.success('Transação atualizada com sucesso!');
      } else {
        createTransaction({ ...data, amount });
        toast.success('Transação criada com sucesso!');
        reset();
      }
      
      onClose?.();
    } catch (error) {
      toast.error('Erro ao salvar transação');
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {transaction ? 'Editar Transação' : 'Nova Transação'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Descrição é obrigatória' })}
              placeholder="Descreva a transação..."
              className="min-h-[80px]"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register('amount', { 
                  required: 'Valor é obrigatório',
                  min: { value: 0.01, message: 'Valor deve ser maior que 0' }
                })}
                placeholder="0,00"
              />
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select onValueChange={(value) => setValue('type', value as any)} defaultValue={watchedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                  <SelectItem value="transfer">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600">Categoria é obrigatória</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              {...register('date', { required: 'Data é obrigatória' })}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="flex-1"
            >
              {isCreating || isUpdating ? 'Salvando...' : transaction ? 'Atualizar' : 'Criar Transação'}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
