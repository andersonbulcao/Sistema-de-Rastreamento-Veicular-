import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Dashboard } from '../Dashboard';
import { VehicleList } from '../VehicleList';
import { RouteHistory } from '../RouteHistory';
import { Reports } from '../Reports';
import { Alerts } from '../Alerts';
import { Settings } from '../Settings';
import { ClientManagement } from './ClientManagement';
import { User } from '../../App';

type ActiveView = 'dashboard' | 'vehicles' | 'routes' | 'reports' | 'alerts' | 'clients' | 'settings';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'vehicles':
        return <VehicleList />;
      case 'routes':
        return <RouteHistory />;
      case 'reports':
        return <Reports />;
      case 'alerts':
        return <Alerts />;
      case 'clients':
        return <ClientManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole="admin"
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header 
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}