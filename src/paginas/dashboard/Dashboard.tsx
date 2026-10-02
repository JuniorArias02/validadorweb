import React from 'react';
import { useEstadisticas } from '../../hooks/useEstadisticas';
import { useClientes } from '../../hooks/useClientes';
import { useContactos } from '../../hooks/useContactos';
import { Layout } from '../../componentes/layout/Layout';
import { TarjetaEstadistica } from '../../componentes/tarjetas/TarjetaEstadistica';
import { BarraProgreso } from '../../componentes/tarjetas/BarraProgreso';
import { TablaClientes } from '../../componentes/tablas/TablaClientes';
import { TablaContactos } from '../../componentes/tablas/TablaContactos';

export const Dashboard: React.FC = () => {
  const { estadisticas, estadoConexion: estadoEstadisticas } = useEstadisticas();
  const { clientes, cargando: cargandoClientes } = useClientes();
  const { datosPaginados, cargando: cargandoContactos, params, actualizarParams } = useContactos();

  return (
    <Layout estadoConexion={estadoEstadisticas}>
      <div className="space-y-6">
        
        {/* Sección de Tarjetas Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TarjetaEstadistica 
            titulo="Total Contactos" 
            valor={estadisticas?.contactos.total || 0}
            colorClase="text-blue-600"
          />
          <TarjetaEstadistica 
            titulo="Completados" 
            valor={estadisticas?.contactos.completados || 0}
            colorClase="text-green-600"
          />
          <TarjetaEstadistica 
            titulo="Pendientes" 
            valor={estadisticas?.contactos.pendientes || 0}
            colorClase="text-slate-600"
          />
          <TarjetaEstadistica 
            titulo="Errores" 
            valor={estadisticas?.contactos.errores || 0}
            colorClase="text-red-600"
          />
        </div>

        {/* Sección Central: Progreso y WhatsApp */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BarraProgreso progreso={estadisticas?.progreso || 0} />
            <TablaClientes clientes={clientes} cargando={cargandoClientes} />
          </div>
          
          <div className="space-y-6 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Estado WhatsApp</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Con WhatsApp
                  </span>
                  <span className="font-bold text-lg text-slate-800">{estadisticas?.whatsapp.conWhatsapp || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Sin WhatsApp
                  </span>
                  <span className="font-bold text-lg text-slate-800">{estadisticas?.whatsapp.sinWhatsapp || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-4">Actividad Actual</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600">Validaciones Activas</span>
                  <span className="font-bold text-xl text-blue-800">{estadisticas?.validaciones.activas || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600">En Proceso</span>
                  <span className="font-bold text-xl text-blue-800">{estadisticas?.contactos.validando || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Inferior: Lista de Contactos */}
        <div>
          <TablaContactos 
            datosPaginados={datosPaginados} 
            cargando={cargandoContactos} 
            params={params} 
            alCambiarParams={actualizarParams} 
          />
        </div>

      </div>
    </Layout>
  );
};
