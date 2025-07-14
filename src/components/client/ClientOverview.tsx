import React from 'react';
import { Car, MapPin, AlertTriangle, Clock, TrendingUp, Activity } from 'lucide-react';
import { StatsCard } from '../StatsCard';
import { ClientVehicleMap } from './ClientVehicleMap';
import { ClientRecentAlerts } from './ClientRecentAlerts';
import { ClientActiveVehicles } from './ClientActiveVehicles';
import { User } from '../../App';

interface ClientOverviewProps {
  user: User;
}

export function ClientOverview({ user }: ClientOverviewProps) {
  const userVehicles = user.vehicleIds || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-600">Acompanhe seus veículos em tempo real</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Meus Veículos"
          value={userVehicles.length.toString()}
          icon={Car}
          color="blue"
          trend="+0%"
        />
        <StatsCard
          title="Veículos Ativos"
          value={(userVehicles.length - 1).toString()}
          icon={Activity}
          color="green"
          trend="+0%"
        />
        <StatsCard
          title="Alertas Ativos"
          value="2"
          icon={AlertTriangle}
          color="yellow"
          trend="-1"
        />
        <StatsCard
          title="Km Hoje"
          value="1,247"
          icon={TrendingUp}
          color="purple"
          trend="+8.2%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClientVehicleMap user={user} />
        </div>
        <div className="space-y-6">
          <ClientRecentAlerts user={user} />
          <ClientActiveVehicles user={user} />
        </div>
      </div>
    </div>
  );
}