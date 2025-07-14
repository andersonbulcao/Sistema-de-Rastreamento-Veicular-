import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, Filter, Bell } from 'lucide-react';
import { User } from '../../App';

interface ClientAlertsProps {
  user: User;
}

export function ClientAlerts({ user }: ClientAlertsProps) {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const allAlerts = [
    {
      id: 1,
      type: 'speed',
      title: 'Velocidade Excedida',
      description: 'VEI-001 ultrapassou 85 km/h na Av. Paulista',
      vehicle: 'VEI-001',
      driver: 'Carlos Silva',
      severity: 'high',
      timestamp: '2024-01-15T10:30:00',
      status: 'active',
      location: 'Av. Paulista, SP'
    },
    {
      id: 2,
      type: 'geofence',
      title: 'Saída de Área',
      description: 'VEI-003 saiu da área autorizada sem permissão',
      vehicle: 'VEI-003',
      driver: 'João Oliveira',
      severity: 'high',
      timestamp: '2024-01-15T08:45:00',
      status: 'resolved',
      location: 'Zona Industrial, MG'
    },
    {
      id: 3,
      type: 'idle',
      title: 'Veículo Parado',
      description: 'VEI-007 está parado há mais de 2 horas',
      vehicle: 'VEI-007',
      driver: 'Pedro Costa',
      severity: 'low',
      timestamp: '2024-01-15T08:00:00',
      status: 'active',
      location: 'BR-101, km 45'
    },
    {
      id: 4,
      type: 'fuel',
      title: 'Combustível Baixo',
      description: 'VEI-007 com apenas 15% de combustível',
      vehicle: 'VEI-007',
      driver: 'Pedro Costa',
      severity: 'medium',
      timestamp: '2024-01-15T07:30:00',
      status: 'resolved',
      location: 'BR-101, km 45'
    }
  ];

  // Filtrar apenas alertas dos veículos do usuário
  const userAlerts = allAlerts.filter(alert => 
    user.vehicleIds?.includes(alert.vehicle)
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'speed': return '🚨';
      case 'maintenance': return '🔧';
      case 'geofence': return '📍';
      case 'idle': return '⏸️';
      case 'fuel': return '⛽';
      default: return '⚠️';
    }
  };

  const filteredAlerts = userAlerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    return matchesType && matchesSeverity;
  });

  const activeAlerts = userAlerts.filter(alert => alert.status === 'active').length;
  const resolvedAlerts = userAlerts.filter(alert => alert.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alertas</h1>
        <p className="text-gray-600">Monitore alertas dos seus veículos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertas Ativos</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{activeAlerts}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolvidos Hoje</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{resolvedAlerts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Alertas</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{userAlerts.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Tipos</option>
                <option value="speed">Velocidade</option>
                <option value="geofence">Geolocalização</option>
                <option value="idle">Inatividade</option>
                <option value="fuel">Combustível</option>
              </select>
            </div>
            
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas as Severidades</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Total: {filteredAlerts.length} alertas</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 hover:bg-gray-50 transition-colors ${
              alert.status === 'resolved' ? 'opacity-60' : ''
            }`}>
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{getTypeIcon(alert.type)}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity === 'high' ? 'Alta' : alert.severity === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                    {alert.status === 'resolved' && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Resolvido
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Veículo: {alert.vehicle}</span>
                    <span>Motorista: {alert.driver}</span>
                    <span>Local: {alert.location}</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum alerta encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}