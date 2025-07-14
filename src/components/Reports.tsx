import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Filter, Search } from 'lucide-react';

export function Reports() {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('month');
  const [selectedVehicles, setSelectedVehicles] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const reports = [
    {
      id: 1,
      name: 'Relatório de Performance',
      description: 'Análise de performance da frota por período',
      type: 'performance',
      generated: '2024-01-15',
      size: '2.4 MB',
      vehicles: 'Todos',
      period: 'Janeiro 2024'
    },
    {
      id: 2,
      name: 'Consumo de Combustível',
      description: 'Relatório detalhado de consumo por veículo',
      type: 'fuel',
      generated: '2024-01-14',
      size: '1.8 MB',
      vehicles: 'VEI-001, VEI-003',
      period: 'Última Semana'
    },
    {
      id: 3,
      name: 'Manutenção Preventiva',
      description: 'Status de manutenção da frota',
      type: 'maintenance',
      generated: '2024-01-13',
      size: '1.2 MB',
      vehicles: 'Todos',
      period: 'Dezembro 2023'
    },
    {
      id: 4,
      name: 'Análise de Rotas',
      description: 'Eficiência e otimização de rotas',
      type: 'routes',
      generated: '2024-01-12',
      size: '3.1 MB',
      vehicles: 'VEI-001, VEI-002, VEI-004',
      period: 'Último Mês'
    }
  ];

  const metrics = [
    {
      title: 'Distância Total',
      value: '15,847 km',
      change: '+12.5%',
      type: 'positive'
    },
    {
      title: 'Consumo Médio',
      value: '8.2 L/100km',
      change: '-3.2%',
      type: 'positive'
    },
    {
      title: 'Tempo de Atividade',
      value: '89.5%',
      change: '+5.1%',
      type: 'positive'
    },
    {
      title: 'Custo por KM',
      value: 'R$ 2.15',
      change: '-1.8%',
      type: 'positive'
    }
  ];

  const vehicles = [
    { id: 'VEI-001', name: 'VEI-001 - Volkswagen Constellation' },
    { id: 'VEI-002', name: 'VEI-002 - Honda Civic' },
    { id: 'VEI-003', name: 'VEI-003 - Mercedes Sprinter' },
    { id: 'VEI-004', name: 'VEI-004 - Ford Ranger' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simular geração de relatório
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Criar dados do relatório baseado nos filtros
    const reportData = generateReportData();
    
    // Gerar e baixar arquivo
    downloadReport(reportData);
    
    setIsGenerating(false);
  };

  const generateReportData = () => {
    const baseData = {
      reportType,
      dateRange,
      selectedVehicles,
      generatedAt: new Date().toISOString(),
      summary: {
        totalVehicles: selectedVehicles === 'all' ? vehicles.length : 1,
        totalDistance: Math.floor(Math.random() * 10000) + 5000,
        totalFuel: Math.floor(Math.random() * 1000) + 500,
        averageSpeed: Math.floor(Math.random() * 30) + 40,
        totalCost: Math.floor(Math.random() * 5000) + 2000
      }
    };

    switch (reportType) {
      case 'performance':
        return {
          ...baseData,
          data: generatePerformanceData()
        };
      case 'fuel':
        return {
          ...baseData,
          data: generateFuelData()
        };
      case 'maintenance':
        return {
          ...baseData,
          data: generateMaintenanceData()
        };
      case 'routes':
        return {
          ...baseData,
          data: generateRoutesData()
        };
      default:
        return baseData;
    }
  };

  const generatePerformanceData = () => {
    return vehicles.map(vehicle => ({
      vehicleId: vehicle.id,
      totalDistance: Math.floor(Math.random() * 2000) + 1000,
      averageSpeed: Math.floor(Math.random() * 20) + 40,
      fuelEfficiency: (Math.random() * 5 + 6).toFixed(1),
      activeTime: Math.floor(Math.random() * 30) + 70,
      alerts: Math.floor(Math.random() * 10)
    }));
  };

  const generateFuelData = () => {
    return vehicles.map(vehicle => ({
      vehicleId: vehicle.id,
      totalFuel: Math.floor(Math.random() * 200) + 100,
      fuelCost: Math.floor(Math.random() * 800) + 400,
      efficiency: (Math.random() * 3 + 7).toFixed(1),
      refuels: Math.floor(Math.random() * 10) + 5
    }));
  };

  const generateMaintenanceData = () => {
    return vehicles.map(vehicle => ({
      vehicleId: vehicle.id,
      lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      maintenanceCost: Math.floor(Math.random() * 2000) + 500,
      status: Math.random() > 0.7 ? 'Vencida' : 'Em dia'
    }));
  };

  const generateRoutesData = () => {
    return vehicles.map(vehicle => ({
      vehicleId: vehicle.id,
      totalRoutes: Math.floor(Math.random() * 50) + 20,
      averageRouteTime: Math.floor(Math.random() * 120) + 60,
      efficiency: Math.floor(Math.random() * 30) + 70,
      mostUsedRoute: `Rota ${Math.floor(Math.random() * 10) + 1}`
    }));
  };

  const downloadReport = (data) => {
    let content = '';
    
    if (reportType === 'performance') {
      content = generatePerformanceCSV(data);
    } else if (reportType === 'fuel') {
      content = generateFuelCSV(data);
    } else if (reportType === 'maintenance') {
      content = generateMaintenanceCSV(data);
    } else if (reportType === 'routes') {
      content = generateRoutesCSV(data);
    }

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_${reportType}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePerformanceCSV = (data) => {
    const headers = ['Veículo', 'Distância Total (km)', 'Velocidade Média (km/h)', 'Eficiência Combustível (L/100km)', 'Tempo Ativo (%)', 'Alertas'];
    const rows = data.data.map(item => [
      item.vehicleId,
      item.totalDistance,
      item.averageSpeed,
      item.fuelEfficiency,
      item.activeTime,
      item.alerts
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const generateFuelCSV = (data) => {
    const headers = ['Veículo', 'Combustível Total (L)', 'Custo Total (R$)', 'Eficiência (L/100km)', 'Abastecimentos'];
    const rows = data.data.map(item => [
      item.vehicleId,
      item.totalFuel,
      item.fuelCost,
      item.efficiency,
      item.refuels
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const generateMaintenanceCSV = (data) => {
    const headers = ['Veículo', 'Última Manutenção', 'Próxima Manutenção', 'Custo (R$)', 'Status'];
    const rows = data.data.map(item => [
      item.vehicleId,
      item.lastMaintenance,
      item.nextMaintenance,
      item.maintenanceCost,
      item.status
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const generateRoutesCSV = (data) => {
    const headers = ['Veículo', 'Total de Rotas', 'Tempo Médio (min)', 'Eficiência (%)', 'Rota Mais Usada'];
    const rows = data.data.map(item => [
      item.vehicleId,
      item.totalRoutes,
      item.averageRouteTime,
      item.efficiency,
      item.mostUsedRoute
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadExistingReport = (report) => {
    // Simular download de relatório existente
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.name.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios e Análises</h1>
        <p className="text-gray-600">Análise detalhada da performance da frota</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    metric.type === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    metric.type === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs período anterior</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Gerar Novo Relatório</h3>
            <p className="text-sm text-gray-600">Crie relatórios personalizados</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Relatório
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="performance">Performance da Frota</option>
                <option value="fuel">Consumo de Combustível</option>
                <option value="maintenance">Manutenção</option>
                <option value="routes">Análise de Rotas</option>
                <option value="costs">Análise de Custos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Último Ano</option>
                <option value="custom">Período Personalizado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Veículos
              </label>
              <select
                value={selectedVehicles}
                onChange={(e) => setSelectedVehicles(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Veículos</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Gerar Relatório</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Relatórios Recentes</h3>
                <p className="text-sm text-gray-600">Histórico de relatórios gerados</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-9 pr-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{report.generated}</span>
                        </div>
                        <span>{report.size}</span>
                        <span>{report.vehicles}</span>
                        <span>{report.period}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => downloadExistingReport(report)}
                    className="text-blue-600 hover:text-blue-800 p-1 ml-2"
                    title="Baixar relatório"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Dashboard Analytics</h3>
          <p className="text-sm text-gray-600">Visualização gráfica dos dados</p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900">Gráfico de Performance</h4>
                <p className="text-sm text-gray-600">Análise temporal da frota</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Visualizar Dados
                </button>
              </div>
            </div>
            
            <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900">Distribuição de Uso</h4>
                <p className="text-sm text-gray-600">Análise por categoria de veículo</p>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                  Ver Distribuição
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}