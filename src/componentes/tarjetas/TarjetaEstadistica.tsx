import React from 'react';

interface Props {
  titulo: string;
  valor: string | number;
  icono?: React.ReactNode;
  colorClase?: string;
}

export const TarjetaEstadistica: React.FC<Props> = ({ titulo, valor, icono, colorClase = 'text-blue-600' }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-md">
      <div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">{titulo}</h3>
        <p className={`text-3xl font-bold ${colorClase}`}>{valor}</p>
      </div>
      {icono && (
        <div className={`p-3 rounded-xl ${colorClase.replace('text-', 'bg-').replace('-600', '-50')} bg-opacity-50`}>
          {icono}
        </div>
      )}
    </div>
  );
};
