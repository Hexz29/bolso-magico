
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, CreditCard, PiggyBank } from 'lucide-react';

export const Calculators: React.FC = () => {
  // Juros Compostos
  const [compoundData, setCompoundData] = useState({
    principal: 1000,
    rate: 10,
    time: 12,
    monthlyContribution: 100
  });
  const [compoundResult, setCompoundResult] = useState<any>(null);

  // Empréstimo
  const [loanData, setLoanData] = useState({
    amount: 10000,
    rate: 2.5,
    months: 24
  });
  const [loanResult, setLoanResult] = useState<any>(null);

  // Investimento
  const [investmentData, setInvestmentData] = useState({
    monthlyAmount: 500,
    rate: 8,
    months: 60
  });
  const [investmentResult, setInvestmentResult] = useState<any>(null);

  const calculateCompoundInterest = () => {
    const { principal, rate, time, monthlyContribution } = compoundData;
    const monthlyRate = rate / 100 / 12;
    
    let futureValue = principal * Math.pow(1 + monthlyRate, time);
    
    if (monthlyContribution > 0) {
      const contributionValue = monthlyContribution * ((Math.pow(1 + monthlyRate, time) - 1) / monthlyRate);
      futureValue += contributionValue;
    }
    
    const totalContributions = principal + (monthlyContribution * time);
    const totalInterest = futureValue - totalContributions;
    
    setCompoundResult({
      futureValue,
      totalContributions,
      totalInterest
    });
  };

  const calculateLoan = () => {
    const { amount, rate, months } = loanData;
    const monthlyRate = rate / 100;
    
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - amount;
    
    setLoanResult({
      monthlyPayment,
      totalAmount,
      totalInterest
    });
  };

  const calculateInvestment = () => {
    const { monthlyAmount, rate, months } = investmentData;
    const monthlyRate = rate / 100 / 12;
    
    const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalInvested = monthlyAmount * months;
    const totalReturns = futureValue - totalInvested;
    
    setInvestmentResult({
      futureValue,
      totalInvested,
      totalReturns
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Calculadoras Financeiras</h1>
        <p className="text-slate-600">
          Ferramentas para planejamento e análise financeira.
        </p>
      </div>

      <Tabs defaultValue="compound" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compound" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Juros Compostos
          </TabsTrigger>
          <TabsTrigger value="loan" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Empréstimo
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Investimento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compound" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculadora de Juros Compostos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="principal">Valor Inicial (R$)</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={compoundData.principal}
                    onChange={(e) => setCompoundData({...compoundData, principal: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="rate">Taxa de Juros Anual (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={compoundData.rate}
                    onChange={(e) => setCompoundData({...compoundData, rate: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Período (meses)</Label>
                  <Input
                    id="time"
                    type="number"
                    value={compoundData.time}
                    onChange={(e) => setCompoundData({...compoundData, time: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyContribution">Aporte Mensal (R$)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={compoundData.monthlyContribution}
                    onChange={(e) => setCompoundData({...compoundData, monthlyContribution: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <Button onClick={calculateCompoundInterest} className="w-full btn-gradient">
                  Calcular
                </Button>
              </CardContent>
            </Card>

            {compoundResult && (
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor Final:</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatCurrency(compoundResult.futureValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Investido:</span>
                      <span className="font-medium">
                        {formatCurrency(compoundResult.totalContributions)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Juros Ganhos:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(compoundResult.totalInterest)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="loan" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Simulador de Empréstimo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Valor do Empréstimo (R$)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanData.amount}
                    onChange={(e) => setLoanData({...loanData, amount: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="loanRate">Taxa de Juros Mensal (%)</Label>
                  <Input
                    id="loanRate"
                    type="number"
                    step="0.1"
                    value={loanData.rate}
                    onChange={(e) => setLoanData({...loanData, rate: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="loanMonths">Prazo (meses)</Label>
                  <Input
                    id="loanMonths"
                    type="number"
                    value={loanData.months}
                    onChange={(e) => setLoanData({...loanData, months: parseInt(e.target.value) || 0})}
                  />
                </div>
                <Button onClick={calculateLoan} className="w-full btn-gradient">
                  Calcular
                </Button>
              </CardContent>
            </Card>

            {loanResult && (
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parcela Mensal:</span>
                      <span className="font-bold text-red-600 text-lg">
                        {formatCurrency(loanResult.monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total a Pagar:</span>
                      <span className="font-medium">
                        {formatCurrency(loanResult.totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de Juros:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(loanResult.totalInterest)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="financial-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Planejador de Investimentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthlyAmount">Valor Mensal (R$)</Label>
                  <Input
                    id="monthlyAmount"
                    type="number"
                    value={investmentData.monthlyAmount}
                    onChange={(e) => setInvestmentData({...investmentData, monthlyAmount: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="investmentRate">Rentabilidade Anual (%)</Label>
                  <Input
                    id="investmentRate"
                    type="number"
                    step="0.1"
                    value={investmentData.rate}
                    onChange={(e) => setInvestmentData({...investmentData, rate: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="investmentMonths">Período (meses)</Label>
                  <Input
                    id="investmentMonths"
                    type="number"
                    value={investmentData.months}
                    onChange={(e) => setInvestmentData({...investmentData, months: parseInt(e.target.value) || 0})}
                  />
                </div>
                <Button onClick={calculateInvestment} className="w-full btn-gradient">
                  Calcular
                </Button>
              </CardContent>
            </Card>

            {investmentResult && (
              <Card className="financial-card">
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor Final:</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatCurrency(investmentResult.futureValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Investido:</span>
                      <span className="font-medium">
                        {formatCurrency(investmentResult.totalInvested)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rentabilidade:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(investmentResult.totalReturns)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
