
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, TrendingUp, Shield, BarChart3, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erro de validação',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) {
          toast({
            title: 'Erro ao criar conta',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Conta criada com sucesso!',
            description: 'Verifique seu email para confirmar a conta.',
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          toast({
            title: 'Erro ao fazer login',
            description: error.message,
            variant: 'destructive',
          });
        }
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

        {/* Right side - Login/Signup Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md financial-card-elevated border-0 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50">
                <Wallet className="h-12 w-12 text-emerald-600 mx-auto" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">
                  {isSignUp ? 'Crie sua conta' : 'Bem-vindo de volta!'}
                </CardTitle>
                <CardDescription className="text-base">
                  {isSignUp 
                    ? 'Preencha os dados para começar'
                    : 'Entre com seu email e senha'
                  }
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold btn-gradient"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {isSignUp ? 'Criando conta...' : 'Entrando...'}
                    </div>
                  ) : (
                    isSignUp ? 'Criar conta' : 'Entrar'
                  )}
                </Button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-muted-foreground hover:text-primary underline"
                  >
                    {isSignUp 
                      ? 'Já tem uma conta? Faça login'
                      : 'Não tem uma conta? Cadastre-se'
                    }
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
