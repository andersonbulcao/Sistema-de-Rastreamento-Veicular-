import React, { useState } from 'react';
import { ClientSidebar } from './ClientSidebar';
import { ClientHeader } from './ClientHeader';
import { ClientOverview } from './ClientOverview';
import { ClientVehicles } from './ClientVehicles';
import { ClientRoutes } from './ClientRoutes';
import { ClientReports } from './ClientReports';
import { ClientAlerts } from './ClientAlerts';
import { ClientProfile } from './ClientProfile';
import { User } from '../../App';

type ActiveView = 'overview' | 'vehicles' | 'routes' | 'reports' | 'alerts' | 'profile';

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ClientDashboard({ user, onLogout }: ClientDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <ClientOverview user={user} />;
      case 'vehicles':
        return <ClientVehicles user={user} />;
      case 'routes':
        return <ClientRoutes user={user} />;
      case 'reports':
        return <ClientReports user={user} />;
      case 'alerts':
        return <ClientAlerts user={user} />;
      case 'profile':
        return <ClientProfile user={user} />;
      default:
        return <ClientOverview user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ClientSidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ClientHeader 
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