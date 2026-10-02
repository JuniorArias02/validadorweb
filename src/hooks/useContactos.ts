import { useState, useEffect, useCallback } from 'react';
import type { RespuestaPaginada, Contacto } from '../tipos';
import { obtenerContactos, subirContactosMasivo } from '../servicios/api/contactos.api';
import type { ParametrosContactos } from '../servicios/api/contactos.api';

export const useContactos = (paramsIniciales: ParametrosContactos = {}, intervaloMs = 10000) => {
  const [datosPaginados, setDatosPaginados] = useState<RespuestaPaginada<Contacto> | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState<ParametrosContactos>(paramsIniciales);
  const [estadoConexion, setEstadoConexion] = useState<'conectado' | 'desconectado'>('desconectado');

  const fetchDatos = useCallback(async (parametrosActuales: ParametrosContactos) => {
    try {
      const datos = await obtenerContactos(parametrosActuales);
      setDatosPaginados(datos);
      setEstadoConexion('conectado');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
      setEstadoConexion('desconectado');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let montado = true;
    setCargando(true);
    
    const realizarFetch = async () => {
      if (montado) await fetchDatos(params);
    };
    
    realizarFetch();
    const intervalo = setInterval(realizarFetch, intervaloMs);

    return () => {
      montado = false;
      clearInterval(intervalo);
    };
  }, [params, intervaloMs, fetchDatos]);

  const actualizarParams = (nuevosParams: Partial<ParametrosContactos>) => {
    setParams(prev => ({ ...prev, ...nuevosParams, pagina: nuevosParams.pagina || 1 }));
  };

  const subirLote = async (contactos: { telefono: string; nombre?: string }[]) => {
    try {
      const res = await subirContactosMasivo(contactos);
      await fetchDatos(params); // Refrescar lista después de subir
      return res;
    } catch (err) {
      throw err;
    }
  };

  return { datosPaginados, cargando, error, estadoConexion, params, actualizarParams, subirLote };
};
