
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/components/auth/AuthProvider';
import { LoginPage } from '@/components/auth/LoginPage';
import { Menu } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-2 border-primary/10" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-slate-600">Carregando...</p>
            <p className="text-sm text-slate-500">Preparando sua experiência financeira</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Mobile header */}
          <header className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm lg:hidden">
            <SidebarTrigger className="p-2 hover:bg-accent rounded-lg">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <h1 className="font-semibold text-lg">Bolso Mágico</h1>
            <div className="w-9" /> {/* Spacer */}
          </header>

          {/* Main content */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="container mx-auto p-4 lg:p-6 max-w-7xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
