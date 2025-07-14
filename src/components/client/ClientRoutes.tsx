import React, { useState } from 'react';
import { Route, Calendar, Clock, MapPin, Fuel } from 'lucide-react';
import { User } from '../../App';

interface ClientRoutesProps {
  user: User;
}

export function ClientRoutes({ user }: ClientRoutesProps) {
  const [selectedDate, setSelectedDate] = useState('today');

  const allRoutes = [
    {
      id: 1,
      vehicle: 'VEI-001',
      driver: 'Carlos Silva',
      startTime: '08:00',
      endTime: '17:30',
      startLocation: 'Depósito Central',
      endLocation: 'Cliente A - SP',
      distance: 125.5,
      duration: '9h 30m',
      fuelUsed: 18.2,
      avgSpeed: 42,
      status: 'completed'
    },
    {
      id: 2,
      vehicle: 'VEI-003',
      driver: 'João Oliveira',
      startTime: '07:30',
      endTime: 'Em andamento',
      startLocation: 'Base Sul',
      endLocation: 'Cliente C - MG',
      distance: 67.8,
      duration: '5h 15m',
      fuelUsed: 9.5,
      avgSpeed: 45,
      status: 'in_progress'
    },
    {
      id: 3,
      vehicle: 'VEI-007',
      driver: 'Pedro Costa',
      startTime: '06:00',
      endTime: '15:45',
      startLocation: 'Terminal Norte',
      endLocation: 'Porto de Santos',
      distance: 89.3,
      duration: '9h 45m',
      fuelUsed: 12.8,
      avgSpeed: 38,
      status: 'completed'
    }
  ];

  // Filtrar apenas as rotas dos veículos do usuário
  const userRoutes = allRoutes.filter(route => 
    user.vehicleIds?.includes(route.vehicle)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'in_progress': return 'Em Andamento';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Histórico de Rotas</h1>
        <p className="text-gray-600">Acompanhe as viagens dos seus veículos</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            >
              <option value="today">Hoje</option>
              <option value="yesterday">Ontem</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
            </select>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userRoutes.reduce((sum, route) => sum + route.distance, 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">km total</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userRoutes.reduce((sum, route) => sum + route.fuelUsed, 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">L combustível</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{userRoutes.length}</div>
            <div className="text-sm text-gray-600">viagens</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veículo/Motorista
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rota
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distância
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Combustível
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{route.vehicle}</div>
                      <div className="text-sm text-gray-500">{route.driver}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{route.startTime} - {route.endTime}</div>
                        <div className="text-sm text-gray-500">{route.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">{route.startLocation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-900">{route.endLocation}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Route className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">{route.distance} km</div>
                        <div className="text-sm text-gray-500">Média: {route.avgSpeed} km/h</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{route.fuelUsed} L</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                      {getStatusText(route.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {userRoutes.length === 0 && (
          <div className="text-center py-8">
            <Route className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma rota encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}