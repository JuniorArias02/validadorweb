import React from 'react';
import type { Cliente } from '../../tipos';

interface Props {
  clientes: Cliente[];
  cargando: boolean;
}

export const TablaClientes: React.FC<Props> = ({ clientes, cargando }) => {
  if (cargando && clientes.length === 0) {
    return <div className="text-slate-400 text-sm p-4">Cargando clientes...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-700">Validadores Conectados</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs uppercase bg-slate-50 text-slate-400">
            <tr>
              <th className="px-6 py-3 font-medium">Identificador</th>
              <th className="px-6 py-3 font-medium">Nombre</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium">Último Latido</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  No hay clientes conectados actualmente.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{cliente.identificador}</td>
                  <td className="px-6 py-4">{cliente.nombre}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        cliente.activa ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {cliente.activa ? '🟢 Activo' : '🔴 Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(cliente.ultimoLatido).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
