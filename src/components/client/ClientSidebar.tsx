import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Route, 
  FileText, 
  AlertTriangle, 
  User,
  Navigation
} from 'lucide-react';

type ActiveView = 'overview' | 'vehicles' | 'routes' | 'reports' | 'alerts' | 'profile';

interface ClientSidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ClientSidebar({ activeView, onViewChange, isOpen, onToggle }: ClientSidebarProps) {
  const menuItems = [
    { id: 'overview' as ActiveView, label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'vehicles' as ActiveView, label: 'Meus Veículos', icon: Car },
    { id: 'routes' as ActiveView, label: 'Rotas', icon: Route },
    { id: 'reports' as ActiveView, label: 'Relatórios', icon: FileText },
    { id: 'alerts' as ActiveView, label: 'Alertas', icon: AlertTriangle },
    { id: 'profile' as ActiveView, label: 'Perfil', icon: User },
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
              <h1 className="text-lg font-semibold">Portal do Cliente</h1>
              <p className="text-blue-300 text-sm">TrackVeículos</p>
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
            <p className="text-blue-300">Status da Conexão</p>
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