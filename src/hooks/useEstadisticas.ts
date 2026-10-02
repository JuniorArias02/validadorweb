import { useState, useEffect } from 'react';
import type { EstadisticasDatos } from '../tipos';
import { obtenerEstadisticas } from '../servicios/api/estadisticas.api';

export const useEstadisticas = (intervaloMs = 5000) => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasDatos | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [estadoConexion, setEstadoConexion] = useState<'conectado' | 'desconectado'>('desconectado');

  useEffect(() => {
    let montado = true;

    const fetchDatos = async () => {
      try {
        const datos = await obtenerEstadisticas();
        if (montado) {
          setEstadisticas(datos);
          setEstadoConexion('conectado');
          setError(null);
        }
      } catch (err) {
        if (montado) {
          setError(err instanceof Error ? err : new Error('Error desconocido'));
          setEstadoConexion('desconectado');
        }
      } finally {
        if (montado) {
          setCargando(false);
        }
      }
    };

    fetchDatos();
    const intervalo = setInterval(fetchDatos, intervaloMs);

    return () => {
      montado = false;
      clearInterval(intervalo);
    };
  }, [intervaloMs]);

  return { estadisticas, cargando, error, estadoConexion };
};
