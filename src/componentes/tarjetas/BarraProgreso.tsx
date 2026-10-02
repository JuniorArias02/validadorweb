import React from 'react';

interface Props {
  progreso: number;
}

export const BarraProgreso: React.FC<Props> = ({ progreso }) => {
  const progresoFormateado = Math.min(Math.max(progreso, 0), 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Progreso de Validación</h3>
        <span className="text-sm font-bold text-blue-600">{progresoFormateado}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progresoFormateado}%` }}
        ></div>
      </div>
    </div>
  );
};
