
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  ArrowLeftRight,
  CreditCard,
  PieChart,
  Target,
  Calculator,
  Settings,
  LogOut,
  Wallet,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Transações', url: '/transactions', icon: ArrowLeftRight },
  { title: 'Contas', url: '/accounts', icon: CreditCard },
  { title: 'Orçamentos', url: '/budgets', icon: PieChart },
  { title: 'Metas', url: '/goals', icon: Target },
  { title: 'Calculadoras', url: '/calculators', icon: Calculator },
  { title: 'Configurações', url: '/settings', icon: Settings },
];

export const AppSidebar: React.FC = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-primary flex-shrink-0">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-sidebar-foreground">Bolso Mágico</h2>
              <p className="text-xs text-sidebar-foreground/60">Gestão Financeira</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className={({ isActive }) =>
                        isActive
                          ? 'nav-link-active'
                          : 'nav-link'
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button
          onClick={signOut}
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
