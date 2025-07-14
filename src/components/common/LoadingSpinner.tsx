import React from 'react';
import { Navigation } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 animate-pulse">
          <Navigation className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}