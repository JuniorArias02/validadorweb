import { fetchApi } from './config';
import type { RespuestaApi, RespuestaPaginada, Contacto } from '../../tipos';

export interface ParametrosContactos {
  pagina?: number;
  limite?: number;
  estadoValidacion?: string;
  estadoWhatsapp?: string;
}

export const obtenerContactos = async (
  params: ParametrosContactos = {}
): Promise<RespuestaPaginada<Contacto>> => {
  const queryParams = new URLSearchParams();
  if (params.pagina) queryParams.append('pagina', params.pagina.toString());
  if (params.limite) queryParams.append('limite', params.limite.toString());
  if (params.estadoValidacion) queryParams.append('estadoValidacion', params.estadoValidacion);
  if (params.estadoWhatsapp) queryParams.append('estadoWhatsapp', params.estadoWhatsapp);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  
  const respuesta = await fetchApi<RespuestaApi<RespuestaPaginada<Contacto>>>(`/contactos${queryString}`);
  return respuesta.datos;
};

export const subirContactosMasivo = async (contactos: { telefono: string; nombre?: string }[]): Promise<{ insertados: number }> => {
  const respuesta = await fetchApi<RespuestaApi<{ insertados: number }>>('/contactos/masivo', {
    method: 'POST',
    body: JSON.stringify({ contactos }),
  });
  return respuesta.datos;
};
