import React from 'react';
import type { RespuestaPaginada, Contacto } from '../../tipos';
import type { ParametrosContactos } from '../../servicios/api/contactos.api';

interface Props {
  datosPaginados: RespuestaPaginada<Contacto> | null;
  cargando: boolean;
  params: ParametrosContactos;
  alCambiarParams: (nuevos: Partial<ParametrosContactos>) => void;
}

export const TablaContactos: React.FC<Props> = ({ datosPaginados, cargando, params, alCambiarParams }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-semibold text-slate-700">Lista de Contactos</h3>
        
        <div className="flex gap-2">
          <select 
            className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-blue-500 focus:border-blue-500 p-2 border"
            value={params.estadoValidacion || ''}
            onChange={(e) => alCambiarParams({ estadoValidacion: e.target.value || undefined, pagina: 1 })}
          >
            <option value="">Todas las validaciones</option>
            <option value="pendiente">Pendientes</option>
            <option value="validando">Validando</option>
            <option value="completado">Completados</option>
            <option value="error">Error</option>
          </select>
          
          <select 
            className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-blue-500 focus:border-blue-500 p-2 border"
            value={params.estadoWhatsapp || ''}
            onChange={(e) => alCambiarParams({ estadoWhatsapp: e.target.value || undefined, pagina: 1 })}
          >
            <option value="">Cualquier estado WA</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="desconocido">Desconocido</option>
            <option value="invalido">Inválido</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs uppercase bg-slate-50 text-slate-400">
            <tr>
              <th className="px-6 py-3 font-medium">Teléfono</th>
              <th className="px-6 py-3 font-medium">Nombre</th>
              <th className="px-6 py-3 font-medium">WhatsApp</th>
              <th className="px-6 py-3 font-medium">Validación</th>
              <th className="px-6 py-3 font-medium text-right">Última validación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cargando && !datosPaginados ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Cargando...</td></tr>
            ) : datosPaginados?.datos.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No se encontraron contactos.</td></tr>
            ) : (
              datosPaginados?.datos.map((contacto) => (
                <tr key={contacto.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{contacto.telefono}</td>
                  <td className="px-6 py-4">{contacto.nombre || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${contacto.estadoWhatsapp === 'activo' ? 'bg-green-100 text-green-700' : 
                        contacto.estadoWhatsapp === 'inactivo' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                      {contacto.estadoWhatsapp}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${contacto.estadoValidacion === 'completado' ? 'bg-blue-100 text-blue-700' : 
                        contacto.estadoValidacion === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {contacto.estadoValidacion}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-right">
                    {contacto.ultimaValidacion ? new Date(contacto.ultimaValidacion).toLocaleString() : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {datosPaginados && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Página <span className="font-medium text-slate-700">{datosPaginados.pagina}</span> de{' '}
            <span className="font-medium text-slate-700">{Math.ceil(datosPaginados.total / datosPaginados.limite)}</span>
          </span>
          <div className="flex gap-2">
            <button 
              disabled={datosPaginados.pagina <= 1}
              onClick={() => alCambiarParams({ pagina: datosPaginados.pagina - 1 })}
              className="px-3 py-1 text-sm border border-slate-200 rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
            >
              Anterior
            </button>
            <button 
              disabled={datosPaginados.pagina >= Math.ceil(datosPaginados.total / datosPaginados.limite)}
              onClick={() => alCambiarParams({ pagina: datosPaginados.pagina + 1 })}
              className="px-3 py-1 text-sm border border-slate-200 rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
