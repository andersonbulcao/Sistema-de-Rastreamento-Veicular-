import React from 'react';
import { X, Car, User, MapPin, Fuel, Calendar, FileText, Wrench } from 'lucide-react';

interface VehicleDetailsProps {
  vehicle: any;
  onClose: () => void;
}

export function VehicleDetails({ vehicle, onClose }: VehicleDetailsProps) {
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
      case 'maintenance': return 'Em Manutenção';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'car': return 'Carro';
      case 'truck': return 'Caminhão';
      case 'van': return 'Van';
      case 'pickup': return 'Pickup';
      case 'motorcycle': return 'Motocicleta';
      default: return type;
    }
  };

  const isMaintenanceDue = () => {
    if (!vehicle.maintenance.nextDate) return false;
    const nextDate = new Date(vehicle.maintenance.nextDate);
    const today = new Date();
    return nextDate <= today;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Detalhes do Veículo {vehicle.id}
                </h2>
                <p className="text-gray-600">{vehicle.plate}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status e Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Informações do Veículo
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                    {getStatusText(vehicle.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modelo:</span>
                  <span className="font-medium">{vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">{getTypeText(vehicle.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ano:</span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cor:</span>
                  <span className="font-medium">{vehicle.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quilometragem:</span>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações Operacionais
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Motorista:</span>
                  <span className="font-medium">{vehicle.driver}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Localização:</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{vehicle.location}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Última Atualização:</span>
                  <span className="font-medium">{vehicle.lastUpdate}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Combustível:</span>
                    <span className="font-medium">{vehicle.fuel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${vehicle.fuel > 50 ? 'bg-green-500' : vehicle.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${vehicle.fuel}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documentação */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Documentação
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Chassi:</span>
                  <span className="font-medium font-mono">{vehicle.chassi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RENAVAM:</span>
                  <span className="font-medium font-mono">{vehicle.renavam}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Manutenção */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Informações de Manutenção
              {isMaintenanceDue() && (
                <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                  Manutenção Vencida
                </span>
              )}
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-600 block">Última Manutenção:</span>
                  <span className="font-medium">
                    {vehicle.maintenance.lastDate ? 
                      new Date(vehicle.maintenance.lastDate).toLocaleDateString('pt-BR') : 
                      'Não informado'
                    }
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block">Próxima Manutenção:</span>
                  <span className={`font-medium ${isMaintenanceDue() ? 'text-red-600' : ''}`}>
                    {vehicle.maintenance.nextDate ? 
                      new Date(vehicle.maintenance.nextDate).toLocaleDateString('pt-BR') : 
                      'Não agendada'
                    }
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block">KM da Última Manutenção:</span>
                  <span className="font-medium">
                    {vehicle.maintenance.km ? 
                      `${vehicle.maintenance.km.toLocaleString()} km` : 
                      'Não informado'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(Math.random() * 50) + 30}
              </div>
              <div className="text-sm text-blue-600">km/h médio</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(Math.random() * 20) + 80}%
              </div>
              <div className="text-sm text-green-600">Tempo ativo</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.floor(Math.random() * 5) + 8}.{Math.floor(Math.random() * 9)}
              </div>
              <div className="text-sm text-yellow-600">L/100km</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.floor(Math.random() * 500) + 200}
              </div>
              <div className="text-sm text-purple-600">km hoje</div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}