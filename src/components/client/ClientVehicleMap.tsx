import React from 'react';
import { MapPin, Navigation2, Truck, Car as CarIcon } from 'lucide-react';
import { User } from '../../App';

interface ClientVehicleMapProps {
  user: User;
}

export function ClientVehicleMap({ user }: ClientVehicleMapProps) {
  const allVehicles = [
    { id: 'VEI-001', name: 'VEI-001', type: 'truck', lat: -23.5505, lng: -46.6333, status: 'moving' },
    { id: 'VEI-002', name: 'VEI-002', type: 'car', lat: -23.5475, lng: -46.6361, status: 'stopped' },
    { id: 'VEI-003', name: 'VEI-003', type: 'truck', lat: -23.5520, lng: -46.6280, status: 'moving' },
    { id: 'VEI-004', name: 'VEI-004', type: 'car', lat: -23.5490, lng: -46.6400, status: 'idle' },
    { id: 'VEI-007', name: 'VEI-007', type: 'truck', lat: -23.5530, lng: -46.6250, status: 'moving' },
    { id: 'VEI-008', name: 'VEI-008', type: 'car', lat: -23.5460, lng: -46.6380, status: 'stopped' },
  ];

  // Filtrar apenas os veículos do usuário
  const userVehicles = allVehicles.filter(vehicle => 
    user.vehicleIds?.includes(vehicle.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Localização dos Veículos</h3>
        <p className="text-sm text-gray-600">Seus veículos em tempo real</p>
      </div>
      
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-b-lg overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-gray-100">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path d="M50 100 Q200 50 350 120" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M20 150 Q150 200 380 180" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M80 250 Q200 220 320 280" stroke="#6B7280" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Vehicle markers */}
        {userVehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${25 + index * 25}%`,
              top: `${30 + index * 20}%`,
            }}
          >
            <div className={`p-2 rounded-full shadow-lg transition-all group-hover:scale-110 ${
              vehicle.status === 'moving' ? 'bg-green-500' :
              vehicle.status === 'stopped' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              {vehicle.type === 'truck' ? (
                <Truck className="w-4 h-4 text-white" />
              ) : (
                <CarIcon className="w-4 h-4 text-white" />
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {vehicle.name}
              <div className="text-xs text-gray-300 capitalize">{vehicle.status}</div>
            </div>
          </div>
        ))}

        {/* Map controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Navigation2 className="w-4 h-4 text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <MapPin className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <h4 className="text-xs font-semibold text-gray-900 mb-2">Legenda</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Em movimento</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Parado</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Sem sinal</span>
            </div>
          </div>
        </div>

        {/* Vehicle count */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <div className="text-sm font-semibold text-gray-900">
            {userVehicles.length} veículo{userVehicles.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-600">
            {userVehicles.filter(v => v.status === 'moving').length} em movimento
          </div>
        </div>
      </div>
    </div>
  );
}