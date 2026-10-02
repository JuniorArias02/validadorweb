import { fetchApi } from './config';
import type { RespuestaApi, Cliente } from '../../tipos';

export const obtenerClientes = async (): Promise<Cliente[]> => {
  const respuesta = await fetchApi<RespuestaApi<Cliente[]>>('/clientes');
  return respuesta.datos;
};
