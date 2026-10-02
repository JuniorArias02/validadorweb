import { fetchApi } from './config';
import type { RespuestaApi, LoginResponse, LoginRequest } from '../../tipos';

export const loginApi = async (credenciales: LoginRequest): Promise<LoginResponse> => {
  const respuesta = await fetchApi<RespuestaApi<LoginResponse>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credenciales),
  });
  return respuesta.datos;
};

export const obtenerSesionApi = async (): Promise<{ id: string; nombre: string; usuario: string }> => {
  const respuesta = await fetchApi<RespuestaApi<{ id: string; nombre: string; usuario: string }>>('/auth/me');
  return respuesta.datos;
};
