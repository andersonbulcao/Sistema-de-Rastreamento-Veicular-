import React, { useState } from 'react';
import { Navigation, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { User } from '../../App';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Usuários de demonstração
  const demoUsers = [
    {
      id: 'admin-1',
      name: 'João Silva',
      email: 'admin@trackveiculos.com',
      password: 'admin123',
      role: 'admin' as const,
      company: 'TrackVeículos Admin'
    },
    {
      id: 'client-1',
      name: 'Carlos Transportes',
      email: 'carlos@transportes.com',
      password: 'cliente123',
      role: 'client' as const,
      company: 'Carlos Transportes Ltda',
      vehicleIds: ['VEI-001', 'VEI-003', 'VEI-007']
    },
    {
      id: 'client-2',
      name: 'Ana Logística',
      email: 'ana@logistica.com',
      password: 'cliente123',
      role: 'client' as const,
      company: 'Ana Logística S.A.',
      vehicleIds: ['VEI-002', 'VEI-004', 'VEI-008']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      setError('Email ou senha incorretos');
    }
    
    setLoading(false);
  };

  const fillDemoCredentials = (userType: 'admin' | 'client') => {
    if (userType === 'admin') {
      setEmail('admin@trackveiculos.com');
      setPassword('admin123');
    } else {
      setEmail('carlos@transportes.com');
      setPassword('cliente123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TrackVeículos</h1>
            <p className="text-gray-600 mt-2">Sistema de Rastreamento Veicular</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Contas de demonstração:</p>
            <div className="space-y-2">
              <button
                onClick={() => fillDemoCredentials('admin')}
                className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">Administrador</div>
                <div className="text-sm text-gray-600">admin@trackveiculos.com</div>
              </button>
              <button
                onClick={() => fillDemoCredentials('client')}
                className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">Cliente</div>
                <div className="text-sm text-gray-600">carlos@transportes.com</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}