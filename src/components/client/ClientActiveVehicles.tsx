import React from 'react';
import { Car, Truck, Navigation, Battery, Signal } from 'lucide-react';
import { User } from '../../App';

interface ClientActiveVehiclesProps {
  user: User;
}

export function ClientActiveVehicles({ user }: ClientActiveVehiclesProps) {
  const allVehicles = [
    {
      id: 'VEI-001',
      type: 'truck',
      driver: 'Carlos Silva',
      location: 'Av. Paulista, SP',
      speed: 45,
      battery: 85,
      signal: 4
    },
    {
      id: 'VEI-002',
      type: 'car',
      driver: 'Ana Santos',
      location: 'Centro, RJ',
      speed: 0,
      battery: 92,
      signal: 5
    },
    {
      id: 'VEI-003',
      type: 'truck',
      driver: 'João Oliveira',
      location: 'Industrial, MG',
      speed: 60,
      battery: 67,
      signal: 3
    },
    {
      id: 'VEI-004',
      type: 'car',
      driver: 'Maria Silva',
      location: 'Zona Sul, RJ',
      speed: 35,
      battery: 78,
      signal: 4
    },
    {
      id: 'VEI-007',
      type: 'truck',
      driver: 'Pedro Costa',
      location: 'BR-101, km 45',
      speed: 80,
      battery: 55,
      signal: 2
    },
    {
      id: 'VEI-008',
      type: 'car',
      driver: 'Lucia Ferreira',
      location: 'Centro, SP',
      speed: 0,
      battery: 90,
      signal: 5
    }
  ];

  // Filtrar apenas os veículos do usuário
  const userVehicles = allVehicles.filter(vehicle => 
    user.vehicleIds?.includes(vehicle.id)
  );

  const getSignalBars = (signal: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-1 h-3 ${i < signal ? 'bg-green-500' : 'bg-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Meus Veículos Ativos</h3>
        <p className="text-sm text-gray-600">Status em tempo real</p>
      </div>
      
      <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
        {userVehicles.length > 0 ? (
          userVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {vehicle.type === 'truck' ? (
                    <Truck className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Car className="w-4 h-4 text-green-600" />
                  )}
                  <span className="font-medium text-gray-900">{vehicle.id}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getSignalBars(vehicle.signal)}
                </div>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Motorista:</span> {vehicle.driver}</p>
                <div className="flex items-center space-x-1">
                  <Navigation className="w-3 h-3" />
                  <span>{vehicle.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Velocidade: <span className="font-medium">{vehicle.speed} km/h</span></span>
                  <div className="flex items-center space-x-1">
                    <Battery className="w-3 h-3" />
                    <span>{vehicle.battery}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <Car className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Nenhum veículo ativo</p>
          </div>
        )}
      </div>
    </div>
  );
}