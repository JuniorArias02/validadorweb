import { fetchApi } from './config';
import type { RespuestaApi, EstadisticasDatos } from '../../tipos';

export const obtenerEstadisticas = async (): Promise<EstadisticasDatos> => {
  const respuesta = await fetchApi<RespuestaApi<EstadisticasDatos>>('/estadisticas');
  return respuesta.datos;
};
