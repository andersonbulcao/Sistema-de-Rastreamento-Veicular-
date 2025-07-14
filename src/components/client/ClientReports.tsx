import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { User } from '../../App';

interface ClientReportsProps {
  user: User;
}

export function ClientReports({ user }: ClientReportsProps) {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('month');

  const reports = [
    {
      id: 1,
      name: 'Relatório de Performance',
      description: 'Análise de performance da sua frota',
      type: 'performance',
      generated: '2024-01-15',
      size: '1.2 MB'
    },
    {
      id: 2,
      name: 'Consumo de Combustível',
      description: 'Relatório de consumo dos seus veículos',
      type: 'fuel',
      generated: '2024-01-14',
      size: '0.8 MB'
    },
    {
      id: 3,
      name: 'Histórico de Rotas',
      description: 'Relatório detalhado das rotas percorridas',
      type: 'routes',
      generated: '2024-01-13',
      size: '1.5 MB'
    }
  ];

  const metrics = [
    {
      title: 'Distância Total',
      value: '2,847 km',
      change: '+8.2%',
      type: 'positive'
    },
    {
      title: 'Consumo Médio',
      value: '7.8 L/100km',
      change: '-2.1%',
      type: 'positive'
    },
    {
      title: 'Tempo de Atividade',
      value: '92.3%',
      change: '+3.5%',
      type: 'positive'
    },
    {
      title: 'Custo por KM',
      value: 'R$ 2.05',
      change: '-0.8%',
      type: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600">Análise detalhada dos seus veículos</p>
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
              </select>
            </div>

            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Gerar Relatório</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Relatórios Recentes</h3>
            <p className="text-sm text-gray-600">Seus relatórios gerados</p>
          </div>
          
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{report.generated}</span>
                        <span className="mx-2">•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}