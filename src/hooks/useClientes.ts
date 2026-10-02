import { useState, useEffect } from 'react';
import type { Cliente } from '../tipos';
import { obtenerClientes } from '../servicios/api/clientes.api';

export const useClientes = (intervaloMs = 5000) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let montado = true;

    const fetchDatos = async () => {
      try {
        const datos = await obtenerClientes();
        if (montado) {
          setClientes(datos);
          setError(null);
        }
      } catch (err) {
        if (montado) {
          setError(err instanceof Error ? err : new Error('Error desconocido'));
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

  return { clientes, cargando, error };
};
