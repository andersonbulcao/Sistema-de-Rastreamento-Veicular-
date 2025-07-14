import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, Filter, Car, MapPin, Eye, UserPlus } from 'lucide-react';
import { ClientForm } from '../forms/ClientForm';
import { ClientDetails } from '../modals/ClientDetails';
import { ConfirmDialog } from '../common/ConfirmDialog';

export function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  const [clients, setClients] = useState([
    {
      id: 'client-1',
      name: 'Carlos Transportes Ltda',
      email: 'carlos@transportes.com',
      phone: '(11) 99999-1111',
      status: 'active',
      vehicleCount: 3,
      lastAccess: '2024-01-15T10:30:00',
      plan: 'Premium',
      vehicles: ['VEI-001', 'VEI-003', 'VEI-007'],
      address: 'Rua das Empresas, 123 - São Paulo, SP',
      cnpj: '12.345.678/0001-90',
      contact: 'Carlos Silva',
      monthlyFee: 299.90
    },
    {
      id: 'client-2',
      name: 'Ana Logística S.A.',
      email: 'ana@logistica.com',
      phone: '(11) 99999-2222',
      status: 'active',
      vehicleCount: 2,
      lastAccess: '2024-01-15T09:15:00',
      plan: 'Standard',
      vehicles: ['VEI-002', 'VEI-004'],
      address: 'Av. Industrial, 456 - Rio de Janeiro, RJ',
      cnpj: '98.765.432/0001-10',
      contact: 'Ana Santos',
      monthlyFee: 199.90
    },
    {
      id: 'client-3',
      name: 'Transportadora Beta',
      email: 'contato@beta.com',
      phone: '(11) 99999-3333',
      status: 'inactive',
      vehicleCount: 5,
      lastAccess: '2024-01-10T14:20:00',
      plan: 'Enterprise',
      vehicles: ['VEI-005', 'VEI-006', 'VEI-008', 'VEI-009', 'VEI-010'],
      address: 'Rod. BR-101, km 50 - Belo Horizonte, MG',
      cnpj: '11.222.333/0001-44',
      contact: 'Roberto Beta',
      monthlyFee: 499.90
    }
  ]);

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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddClient = () => {
    setEditingClient(null);
    setShowForm(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setShowConfirmDelete(true);
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setShowDetails(true);
  };

  const confirmDelete = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    setShowConfirmDelete(false);
    setSelectedClient(null);
  };

  const handleSaveClient = (clientData) => {
    if (editingClient) {
      // Editar cliente existente
      setClients(clients.map(c => 
        c.id === editingClient.id ? { ...c, ...clientData } : c
      ));
    } else {
      // Adicionar novo cliente
      const newClient = {
        ...clientData,
        id: `client-${clients.length + 1}`,
        lastAccess: new Date().toISOString(),
        vehicleCount: 0,
        vehicles: []
      };
      setClients([...clients, newClient]);
    }
    setShowForm(false);
    setEditingClient(null);
  };

  const exportClientData = () => {
    const csvContent = [
      ['Nome', 'Email', 'Telefone', 'Status', 'Plano', 'Veículos', 'Mensalidade', 'Último Acesso'],
      ...filteredClients.map(c => [
        c.name, c.email, c.phone, c.status, c.plan, c.vehicleCount, 
        `R$ ${c.monthlyFee.toFixed(2)}`, new Date(c.lastAccess).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalRevenue = clients
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.monthlyFee, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h1>
          <p className="text-gray-600">Administre os clientes e suas permissões</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={exportClientData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button 
            onClick={handleAddClient}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Cliente</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{clients.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Veículos</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {clients.reduce((sum, client) => sum + client.vehicleCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Car className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                R$ {totalRevenue.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou contato..."
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
                <option value="suspended">Suspenso</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veículos
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mensalidade
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acesso
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">ID: {client.id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(client.plan)}`}>
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{client.vehicleCount} veículos</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      R$ {client.monthlyFee.toFixed(2).replace('.', ',')}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(client.lastAccess).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(client.lastAccess).toLocaleTimeString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDetails(client)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="text-yellow-600 hover:text-yellow-800 p-1"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client)}
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

        {filteredClients.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>

      {/* Modais */}
      {showForm && (
        <ClientForm
          client={editingClient}
          onSave={handleSaveClient}
          onClose={() => {
            setShowForm(false);
            setEditingClient(null);
          }}
        />
      )}

      {showDetails && selectedClient && (
        <ClientDetails
          client={selectedClient}
          onClose={() => {
            setShowDetails(false);
            setSelectedClient(null);
          }}
        />
      )}

      {showConfirmDelete && selectedClient && (
        <ConfirmDialog
          title="Excluir Cliente"
          message={`Tem certeza que deseja excluir o cliente ${selectedClient.name}? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirmDelete(false);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
}