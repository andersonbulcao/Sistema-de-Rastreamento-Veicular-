import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Route, 
  FileText, 
  AlertTriangle, 
  Settings,
  Users,
  Navigation
} from 'lucide-react';

type ActiveView = 'dashboard' | 'vehicles' | 'routes' | 'reports' | 'alerts' | 'clients' | 'settings';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  isOpen: boolean;
  onToggle: () => void;
  userRole?: 'admin' | 'client';
}

export function Sidebar({ activeView, onViewChange, isOpen, onToggle, userRole = 'admin' }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vehicles' as ActiveView, label: 'Veículos', icon: Car },
    { id: 'routes' as ActiveView, label: 'Rotas', icon: Route },
    { id: 'reports' as ActiveView, label: 'Relatórios', icon: FileText },
    { id: 'alerts' as ActiveView, label: 'Alertas', icon: AlertTriangle },
    ...(userRole === 'admin' ? [{ id: 'clients' as ActiveView, label: 'Clientes', icon: Users }] : []),
    { id: 'settings' as ActiveView, label: 'Configurações', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-blue-900 text-white transition-all duration-300 z-30 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-800 rounded-lg">
            <Navigation className="w-6 h-6" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-semibold">TrackVeículos</h1>
              <p className="text-blue-300 text-sm">Sistema de Rastreamento</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-800 transition-colors ${
              activeView === item.id ? 'bg-blue-800 border-r-4 border-blue-400' : ''
            }`}
          >
            <item.icon className="w-5 h-5 min-w-[20px]" />
            {isOpen && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        {isOpen && (
          <div className="bg-blue-800 rounded-lg p-3 text-sm">
            <p className="text-blue-300">Status do Sistema</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Online</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}