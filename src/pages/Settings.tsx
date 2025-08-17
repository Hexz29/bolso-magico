
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, Trash2, AlertTriangle, User, Database } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export const Settings: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAllData = async () => {
    if (confirmationText !== 'DELETAR TUDO') {
      return;
    }

    setIsDeleting(true);
    
    // Simular exclusão de dados
    try {
      // Aqui você adicionaria a lógica real para deletar dados do Supabase
      // Por enquanto, vamos apenas simular um delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Limpar localStorage se houver dados locais
      localStorage.clear();
      
      // Fazer logout após deletar dados
      await signOut();
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setConfirmationText('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-600">
          Gerencie suas preferências e dados da conta.
        </p>
      </div>

      {/* User Info */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">ID do Usuário</Label>
              <p className="text-sm font-mono text-muted-foreground">{user?.id}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Conta criada em</Label>
              <p className="text-sm">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'Não disponível'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Gerenciamento de Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              As opções abaixo são irreversíveis. Tenha certeza antes de prosseguir.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <h3 className="font-semibold text-destructive mb-2">Zona de Perigo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Esta ação irá deletar permanentemente todos os seus dados financeiros, 
                incluindo contas, transações, orçamentos e metas. Esta ação não pode ser desfeita.
              </p>
              
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Deletar Todos os Dados
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Confirmar Exclusão de Dados
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>ATENÇÃO:</strong> Esta ação é irreversível e irá deletar permanentemente:
                      </AlertDescription>
                    </Alert>
                    
                    <ul className="text-sm space-y-1 ml-4 text-muted-foreground">
                      <li>• Todas as suas contas bancárias e cartões</li>
                      <li>• Todas as transações registradas</li>
                      <li>• Todos os orçamentos criados</li>
                      <li>• Todas as metas financeiras</li>
                      <li>• Histórico de dados e estatísticas</li>
                    </ul>

                    <div className="space-y-2">
                      <Label htmlFor="confirmation">
                        Para confirmar, digite <strong>DELETAR TUDO</strong> no campo abaixo:
                      </Label>
                      <Input
                        id="confirmation"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        placeholder="DELETAR TUDO"
                        className="font-mono"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAllData}
                        disabled={confirmationText !== 'DELETAR TUDO' || isDeleting}
                        className="flex-1"
                      >
                        {isDeleting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white mr-2" />
                            Deletando...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Deletar Permanentemente
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsDeleteDialogOpen(false);
                          setConfirmationText('');
                        }}
                        disabled={isDeleting}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Sobre o Aplicativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versão:</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Desenvolvido com:</span>
              <span>React + TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Banco de dados:</span>
              <span>Supabase</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
