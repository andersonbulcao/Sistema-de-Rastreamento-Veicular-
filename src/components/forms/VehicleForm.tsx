import React, { useState, useEffect } from 'react';
import { X, Car, User, MapPin, Fuel, Calendar } from 'lucide-react';

interface VehicleFormProps {
  vehicle?: any;
  onSave: (vehicleData: any) => void;
  onClose: () => void;
}

export function VehicleForm({ vehicle, onSave, onClose }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    type: 'car',
    driver: '',
    status: 'active',
    location: '',
    fuel: 100,
    mileage: 0,
    year: new Date().getFullYear(),
    color: '',
    chassi: '',
    renavam: '',
    maintenance: {
      lastDate: '',
      nextDate: '',
      km: 0
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.plate.trim()) {
      newErrors.plate = 'Placa é obrigatória';
    } else if (!/^[A-Z]{3}-\d{4}$/.test(formData.plate)) {
      newErrors.plate = 'Formato da placa inválido (ABC-1234)';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Modelo é obrigatório';
    }

    if (!formData.driver.trim()) {
      newErrors.driver = 'Motorista é obrigatório';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Localização é obrigatória';
    }

    if (!formData.chassi.trim()) {
      newErrors.chassi = 'Chassi é obrigatório';
    }

    if (!formData.renavam.trim()) {
      newErrors.renavam = 'RENAVAM é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleMaintenanceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      maintenance: {
        ...prev.maintenance,
        [field]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {vehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Informações do Veículo
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placa *
                </label>
                <input
                  type="text"
                  value={formData.plate}
                  onChange={(e) => handleChange('plate', e.target.value.toUpperCase())}
                  placeholder="ABC-1234"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.plate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.plate && <p className="text-red-500 text-sm mt-1">{errors.plate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  placeholder="Ex: Volkswagen Constellation"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.model ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Veículo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="car">Carro</option>
                  <option value="truck">Caminhão</option>
                  <option value="van">Van</option>
                  <option value="pickup">Pickup</option>
                  <option value="motorcycle">Motocicleta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  placeholder="Ex: Branco"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Informações Operacionais */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações Operacionais
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motorista *
                </label>
                <input
                  type="text"
                  value={formData.driver}
                  onChange={(e) => handleChange('driver', e.target.value)}
                  placeholder="Nome do motorista"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.driver ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.driver && <p className="text-red-500 text-sm mt-1">{errors.driver}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="maintenance">Em Manutenção</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização Atual *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Ex: Av. Paulista, SP"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Combustível (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.fuel}
                  onChange={(e) => handleChange('fuel', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span className="font-medium">{formData.fuel}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quilometragem
                </label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleChange('mileage', parseInt(e.target.value))}
                  min="0"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Documentação */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Documentação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chassi *
                </label>
                <input
                  type="text"
                  value={formData.chassi}
                  onChange={(e) => handleChange('chassi', e.target.value.toUpperCase())}
                  placeholder="9BWZZZ377VT004251"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.chassi ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.chassi && <p className="text-red-500 text-sm mt-1">{errors.chassi}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RENAVAM *
                </label>
                <input
                  type="text"
                  value={formData.renavam}
                  onChange={(e) => handleChange('renavam', e.target.value)}
                  placeholder="12345678901"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.renavam ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.renavam && <p className="text-red-500 text-sm mt-1">{errors.renavam}</p>}
              </div>
            </div>
          </div>

          {/* Manutenção */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Informações de Manutenção
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Última Manutenção
                </label>
                <input
                  type="date"
                  value={formData.maintenance.lastDate}
                  onChange={(e) => handleMaintenanceChange('lastDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Próxima Manutenção
                </label>
                <input
                  type="date"
                  value={formData.maintenance.nextDate}
                  onChange={(e) => handleMaintenanceChange('nextDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KM da Última Manutenção
                </label>
                <input
                  type="number"
                  value={formData.maintenance.km}
                  onChange={(e) => handleMaintenanceChange('km', parseInt(e.target.value))}
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {vehicle ? 'Salvar Alterações' : 'Adicionar Veículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}