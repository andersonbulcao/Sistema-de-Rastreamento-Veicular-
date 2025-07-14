import React, { useState, useEffect } from 'react';
import { X, MapPin, Navigation, Clock, Zap, Fuel, Thermometer } from 'lucide-react';

interface TrackingModalProps {
  vehicle: any;
  onClose: () => void;
}

export function TrackingModal({ vehicle, onClose }: TrackingModalProps) {
  const [currentLocation, setCurrentLocation] = useState({
    lat: -23.5505 + (Math.random() - 0.5) * 0.01,
    lng: -46.6333 + (Math.random() - 0.5) * 0.01,
    speed: Math.floor(Math.random() * 80) + 20,
    direction: Math.floor(Math.random() * 360),
    timestamp: new Date()
  });

  const [trackingHistory, setTrackingHistory] = useState([
    { time: '10:30', location: 'Av. Paulista, 1000 - SP', speed: 45, event: 'Em movimento' },
    { time: '10:25', location: 'Rua Augusta, 500 - SP', speed: 35, event: 'Reduzindo velocidade' },
    { time: '10:20', location: 'Av. Consolação, 200 - SP', speed: 50, event: 'Velocidade normal' },
    { time: '10:15', location: 'Rua da Consolação, 100 - SP', speed: 0, event: 'Parado' },
    { time: '10:10', location: 'Praça da República - SP', speed: 25, event: 'Iniciando movimento' }
  ]);

  const [realTimeData, setRealTimeData] = useState({
    engine: 'Ligado',
    temperature: 85,
    rpm: 2100,
    fuel: vehicle.fuel,
    battery: 12.6,
    doors: 'Fechadas',
    alarm: 'Desativado'
  });

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 10),
        direction: (prev.direction + (Math.random() - 0.5) * 20) % 360,
        timestamp: new Date()
      }));

      setRealTimeData(prev => ({
        ...prev,
        temperature: Math.max(70, Math.min(100, prev.temperature + (Math.random() - 0.5) * 5)),
        rpm: Math.max(800, Math.min(3000, prev.rpm + (Math.random() - 0.5) * 200)),
        battery: Math.max(11.5, Math.min(13.2, prev.battery + (Math.random() - 0.5) * 0.2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSpeedColor = (speed: number) => {
    if (speed === 0) return 'text-gray-600';
    if (speed <= 60) return 'text-green-600';
    if (speed <= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Navigation className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Rastreamento em Tempo Real - {vehicle.id}
                </h2>
                <p className="text-gray-600">Monitoramento ativo desde {vehicle.lastUpdate}</p>
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
          {/* Status Atual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Velocidade Atual</p>
                  <p className={`text-2xl font-bold ${getSpeedColor(currentLocation.speed)}`}>
                    {Math.round(currentLocation.speed)} km/h
                  </p>
                </div>
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Combustível</p>
                  <p className="text-2xl font-bold text-green-600">{realTimeData.fuel}%</p>
                </div>
                <Fuel className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600">Temperatura</p>
                  <p className="text-2xl font-bold text-yellow-600">{Math.round(realTimeData.temperature)}°C</p>
                </div>
                <Thermometer className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Última Atualização</p>
                  <p className="text-lg font-bold text-purple-600">
                    {currentLocation.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mapa Simulado */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Localização em Tempo Real
              </h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-80 relative overflow-hidden">
                {/* Mapa simulado */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-gray-100">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      <path d="M50 100 Q200 50 350 120" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.3" />
                      <path d="M20 150 Q150 200 380 180" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.3" />
                      <path d="M80 250 Q200 220 320 280" stroke="#6B7280" strokeWidth="2" fill="none" opacity="0.3" />
                    </svg>
                  </div>
                </div>

                {/* Marcador do veículo */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                >
                  <div className="p-3 bg-red-500 rounded-full shadow-lg">
                    <Navigation 
                      className="w-6 h-6 text-white" 
                      style={{ transform: `rotate(${currentLocation.direction}deg)` }}
                    />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {vehicle.id}
                  </div>
                </div>

                {/* Informações de localização */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md max-w-xs">
                  <p className="text-sm font-medium text-gray-900">Localização Atual</p>
                  <p className="text-xs text-gray-600">{vehicle.location}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
                  </p>
                </div>

                {/* Controles do mapa */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-sm">+</span>
                  </button>
                  <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-sm">-</span>
                  </button>
                </div>
              </div>

              {/* Coordenadas e direção */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Direção:</span>
                    <span className="font-medium ml-2">{Math.round(currentLocation.direction)}°</span>
                  </div>
                  <div>
                    <span className="text-gray-600">RPM:</span>
                    <span className="font-medium ml-2">{realTimeData.rpm}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Bateria:</span>
                    <span className="font-medium ml-2">{realTimeData.battery.toFixed(1)}V</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Motor:</span>
                    <span className="font-medium ml-2 text-green-600">{realTimeData.engine}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico de Rastreamento */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Histórico de Movimentação
              </h3>
              
              <div className="bg-white border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
                <div className="divide-y divide-gray-200">
                  {trackingHistory.map((entry, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full ${
                            entry.speed > 0 ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{entry.time}</p>
                            <span className={`text-sm font-medium ${getSpeedColor(entry.speed)}`}>
                              {entry.speed} km/h
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{entry.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{entry.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status do Sistema */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Status do Sistema</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Portas:</span>
                    <span className="font-medium text-green-600">{realTimeData.doors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alarme:</span>
                    <span className="font-medium text-green-600">{realTimeData.alarm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sinal GPS:</span>
                    <span className="font-medium text-green-600">Forte</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conexão:</span>
                    <span className="font-medium text-green-600">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Exportar Rota
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Configurar Alertas
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Fechar Rastreamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}