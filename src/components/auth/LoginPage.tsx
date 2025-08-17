
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast({
          title: 'Erro ao fazer login',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Tente novamente em alguns momentos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/20 bg-[size:20px_20px] opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/5" />
      
      <div className="relative w-full max-w-4xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="p-3 rounded-2xl gradient-primary">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Bolso Mágico
              </h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Sua vida financeira{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                organizada
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-lg mx-auto lg:mx-0">
              Controle suas finanças, acompanhe seus gastos e conquiste seus objetivos com inteligência e simplicidade.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3 text-slate-700">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">Controle total</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">Relatórios visuais</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">100% seguro</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Wallet className="h-5 w-5 text-emerald-600" />
              <span className="font-medium">Múltiplas contas</span>
            </div>
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md financial-card-elevated border-0 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50">
                <Wallet className="h-12 w-12 text-emerald-600 mx-auto" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Bem-vindo de volta!</CardTitle>
                <CardDescription className="text-base">
                  Entre com sua conta Google para continuar
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full h-12 text-base font-semibold btn-gradient"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Entrar com Google
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
