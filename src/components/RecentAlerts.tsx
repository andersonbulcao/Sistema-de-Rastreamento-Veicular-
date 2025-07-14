import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

export function RecentAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'speed',
      vehicle: 'VEI-001',
      message: 'Velocidade excedida: 85 km/h',
      time: '10:30',
      severity: 'high'
    },
    {
      id: 2,
      type: 'maintenance',
      vehicle: 'VEI-045',
      message: 'Manutenção preventiva vencida',
      time: '09:15',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'geofence',
      vehicle: 'VEI-023',
      message: 'Saída de área autorizada',
      time: '08:45',
      severity: 'high'
    },
    {
      id: 4,
      type: 'idle',
      vehicle: 'VEI-012',
      message: 'Veículo parado há 2h',
      time: '08:00',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Alertas Recentes</h3>
        <p className="text-sm text-gray-600">Últimas notificações do sistema</p>
      </div>
      
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.vehicle}</p>
                  <div className="flex items-center text-xs opacity-75">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
                <p className="text-sm mt-1">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          Ver todos os alertas
        </button>
      </div>
    </div>
  );
}