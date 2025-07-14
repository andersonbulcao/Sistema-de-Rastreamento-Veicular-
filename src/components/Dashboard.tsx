import React from 'react';
import { Car, MapPin, AlertTriangle, Clock, TrendingUp, Activity } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { VehicleMap } from './VehicleMap';
import { RecentAlerts } from './RecentAlerts';
import { ActiveVehicles } from './ActiveVehicles';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de rastreamento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Veículos"
          value="248"
          icon={Car}
          color="blue"
          trend="+5.2%"
        />
        <StatsCard
          title="Veículos Ativos"
          value="186"
          icon={Activity}
          color="green"
          trend="+2.1%"
        />
        <StatsCard
          title="Alertas Ativos"
          value="12"
          icon={AlertTriangle}
          color="yellow"
          trend="-8.3%"
        />
        <StatsCard
          title="Km Percorridos Hoje"
          value="15,847"
          icon={TrendingUp}
          color="purple"
          trend="+12.5%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VehicleMap />
        </div>
        <div className="space-y-6">
          <RecentAlerts />
          <ActiveVehicles />
        </div>
      </div>
    </div>
  );
}