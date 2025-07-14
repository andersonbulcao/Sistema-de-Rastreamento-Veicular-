import React from 'react';
import { X, Building, User, Mail, Phone, CreditCard, Car, Calendar, MapPin } from 'lucide-react';

interface ClientDetailsProps {
  client: any;
  onClose: () => void;
}

export function ClientDetails({ client, onClose }: ClientDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'suspended': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      default: return status;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-700';
      case 'Premium': return 'bg-blue-100 text-blue-700';
      case 'Standard': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Detalhes do Cliente
                </h2>
                <p className="text-gray-600">{client.name}</p>
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
                <Building className="w-5 h-5 mr-2" />
                Informações da Empresa
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                    {getStatusText(client.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-medium">{client.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CNPJ:</span>
                  <span className="font-medium font-mono">{client.cnpj}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Endereço:</span>
                  <span className="font-medium text-right">{client.address}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações de Contato
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contato:</span>
                  <span className="font-medium">{client.contact}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email:</span>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{client.email}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Telefone:</span>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{client.phone}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Último Acesso:</span>
                  <span className="font-medium">
                    {new Date(client.lastAccess).toLocaleDateString('pt-BR')} às{' '}
                    {new Date(client.lastAccess).toLocaleTimeString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Plano e Faturamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Plano e Faturamento
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPlanColor(client.plan)}`}>
                    {client.plan}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Plano Atual</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {client.monthlyFee.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-xs text-gray-500">Mensalidade</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    R$ {(client.monthlyFee * 12).toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-xs text-gray-500">Valor Anual</p>
                </div>
              </div>
            </div>
          </div>

          {/* Veículos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Veículos Associados
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{client.vehicleCount}</p>
                  <p className="text-sm text-gray-600">Veículos Ativos</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Lista de Veículos:</p>
                  <div className="space-y-1">
                    {client.vehicles && client.vehicles.length > 0 ? (
                      client.vehicles.map((vehicleId, index) => (
                        <span key={index} className="inline-block bg-white px-2 py-1 text-xs rounded mr-1 mb-1">
                          {vehicleId}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Nenhum veículo associado</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(Math.random() * 30) + 10}
              </div>
              <div className="text-sm text-blue-600">Dias como cliente</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(Math.random() * 1000) + 500}
              </div>
              <div className="text-sm text-green-600">km percorridos</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.floor(Math.random() * 50) + 20}
              </div>
              <div className="text-sm text-yellow-600">Alertas resolvidos</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.floor(Math.random() * 100) + 95}%
              </div>
              <div className="text-sm text-purple-600">Satisfação</div>
            </div>
          </div>

          {/* Histórico de Atividades */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Histórico Recente
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Último acesso ao sistema</span>
                  <span className="font-medium">{new Date(client.lastAccess).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Pagamento da mensalidade</span>
                  <span className="font-medium">Em dia</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Última atualização de dados</span>
                  <span className="font-medium">Há 5 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Gerar Relatório
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Histórico de Pagamentos
              </button>
            </div>
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