import React, { useState } from 'react';
import { Car, Truck, Search, Filter, Plus, Edit, Trash2, MapPin, User, Fuel, Navigation, Eye, Download } from 'lucide-react';
import { VehicleForm } from './forms/VehicleForm';
import { VehicleDetails } from './modals/VehicleDetails';
import { TrackingModal } from './modals/TrackingModal';
import { ConfirmDialog } from './common/ConfirmDialog';

export function VehicleList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [vehicles, setVehicles] = useState([
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
      lastUpdate: '10:30',
      year: 2020,
      color: 'Branco',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      maintenance: {
        lastDate: '2024-01-01',
        nextDate: '2024-04-01',
        km: 125000
      }
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
      lastUpdate: '09:15',
      year: 2019,
      color: 'Prata',
      chassi: '9BWZZZ377VT004252',
      renavam: '12345678902',
      maintenance: {
        lastDate: '2024-01-10',
        nextDate: '2024-04-10',
        km: 89000
      }
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
      lastUpdate: '10:25',
      year: 2021,
      color: 'Azul',
      chassi: '9BWZZZ377VT004253',
      renavam: '12345678903',
      maintenance: {
        lastDate: '2024-01-05',
        nextDate: '2024-04-05',
        km: 95000
      }
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
      lastUpdate: '08:00',
      year: 2018,
      color: 'Preto',
      chassi: '9BWZZZ377VT004254',
      renavam: '12345678904',
      maintenance: {
        lastDate: '2023-12-15',
        nextDate: '2024-03-15',
        km: 155000
      }
    }
  ]);

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

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || vehicle.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setShowForm(true);
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDeleteVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowConfirmDelete(true);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetails(true);
  };

  const handleTrackVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowTracking(true);
  };

  const confirmDelete = () => {
    setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
    setShowConfirmDelete(false);
    setSelectedVehicle(null);
  };

  const handleSaveVehicle = (vehicleData) => {
    if (editingVehicle) {
      // Editar veículo existente
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id ? { ...v, ...vehicleData } : v
      ));
    } else {
      // Adicionar novo veículo
      const newVehicle = {
        ...vehicleData,
        id: `VEI-${String(vehicles.length + 1).padStart(3, '0')}`,
        lastUpdate: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setShowForm(false);
    setEditingVehicle(null);
  };

  const exportVehicleData = () => {
    const csvContent = [
      ['ID', 'Placa', 'Modelo', 'Tipo', 'Motorista', 'Status', 'Localização', 'Combustível', 'Quilometragem'],
      ...filteredVehicles.map(v => [
        v.id, v.plate, v.model, v.type, v.driver, v.status, v.location, `${v.fuel}%`, v.mileage
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'veiculos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Veículos</h1>
          <p className="text-gray-600">Administre sua frota de veículos</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={exportVehicleData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button 
            onClick={handleAddVehicle}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Veículo</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID, placa ou modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="maintenance">Manutenção</option>
              </select>
            </div>
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
                      <User className="w-4 h-4 text-gray-400" />
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
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDetails(vehicle)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleTrackVehicle(vehicle)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Rastrear"
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditVehicle(vehicle)}
                        className="text-yellow-600 hover:text-yellow-800 p-1"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

      {/* Modais */}
      {showForm && (
        <VehicleForm
          vehicle={editingVehicle}
          onSave={handleSaveVehicle}
          onClose={() => {
            setShowForm(false);
            setEditingVehicle(null);
          }}
        />
      )}

      {showDetails && selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => {
            setShowDetails(false);
            setSelectedVehicle(null);
          }}
        />
      )}

      {showTracking && selectedVehicle && (
        <TrackingModal
          vehicle={selectedVehicle}
          onClose={() => {
            setShowTracking(false);
            setSelectedVehicle(null);
          }}
        />
      )}

      {showConfirmDelete && selectedVehicle && (
        <ConfirmDialog
          title="Excluir Veículo"
          message={`Tem certeza que deseja excluir o veículo ${selectedVehicle.id}? Esta ação não pode ser desfeita.`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirmDelete(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
}