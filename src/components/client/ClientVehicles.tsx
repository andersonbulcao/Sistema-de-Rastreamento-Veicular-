import React, { useState } from 'react';
import { Car, Truck, Search, MapPin, User as UserIcon, Fuel, Navigation } from 'lucide-react';
import { User } from '../../App';

interface ClientVehiclesProps {
  user: User;
}

export function ClientVehicles({ user }: ClientVehiclesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const allVehicles = [
    {
      id: 'VEI-001',
      plate: 'ABC-1234',
      model: 'Volkswagen Constellation',
      type: 'truck',
      driver: 'Carlos Silva',
      status: 'active',
      location: 'Av. Paulista, SP',
      fuel: 75,
      mileage: 128450,
      lastUpdate: '10:30'
    },
    {
      id: 'VEI-002',
      plate: 'DEF-5678',
      model: 'Honda Civic',
      type: 'car',
      driver: 'Ana Santos',
      status: 'maintenance',
      location: 'Oficina Central',
      fuel: 45,
      mileage: 89320,
      lastUpdate: '09:15'
    },
    {
      id: 'VEI-003',
      plate: 'GHI-9012',
      model: 'Mercedes Sprinter',
      type: 'van',
      driver: 'João Oliveira',
      status: 'active',
      location: 'Industrial, MG',
      fuel: 88,
      mileage: 95670,
      lastUpdate: '10:25'
    },
    {
      id: 'VEI-004',
      plate: 'JKL-3456',
      model: 'Ford Ranger',
      type: 'pickup',
      driver: 'Maria Silva',
      status: 'inactive',
      location: 'Garagem',
      fuel: 30,
      mileage: 156890,
      lastUpdate: '08:00'
    },
    {
      id: 'VEI-007',
      plate: 'MNO-7890',
      model: 'Scania R450',
      type: 'truck',
      driver: 'Pedro Costa',
      status: 'active',
      location: 'BR-101, km 45',
      fuel: 55,
      mileage: 234567,
      lastUpdate: '10:35'
    },
    {
      id: 'VEI-008',
      plate: 'PQR-1234',
      model: 'Toyota Corolla',
      type: 'car',
      driver: 'Lucia Ferreira',
      status: 'active',
      location: 'Centro, SP',
      fuel: 90,
      mileage: 67890,
      lastUpdate: '10:20'
    }
  ];

  // Filtrar apenas os veículos do usuário
  const userVehicles = allVehicles.filter(vehicle => 
    user.vehicleIds?.includes(vehicle.id)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'maintenance': return 'Manutenção';
      default: return status;
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'truck': return <Truck className="w-5 h-5" />;
      case 'car': return <Car className="w-5 h-5" />;
      case 'van': return <Car className="w-5 h-5" />;
      case 'pickup': return <Truck className="w-5 h-5" />;
      default: return <Car className="w-5 h-5" />;
    }
  };

  const filteredVehicles = userVehicles.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meus Veículos</h1>
        <p className="text-gray-600">Gerencie e monitore seus veículos</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, placa ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veículo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modelo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motorista
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Combustível
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600">
                        {getVehicleIcon(vehicle.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vehicle.id}</div>
                        <div className="text-sm text-gray-500">{vehicle.plate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vehicle.model}</div>
                    <div className="text-sm text-gray-500">{vehicle.mileage.toLocaleString()} km</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{vehicle.driver}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{vehicle.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${vehicle.fuel > 50 ? 'bg-green-500' : vehicle.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.fuel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{vehicle.fuel}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 p-1 flex items-center space-x-1">
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm">Rastrear</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-8">
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum veículo encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}