export interface RespuestaApi<T> {
  exito: boolean;
  mensaje: string;
  datos: T;
}

export interface EstadisticasDatos {
  contactos: {
    total: number;
    pendientes: number;
    validando: number;
    completados: number;
    errores: number;
  };
  whatsapp: {
    conWhatsapp: number;
    sinWhatsapp: number;
  };
  clientes: {
    activos: number;
  };
  validaciones: {
    activas: number;
  };
  progreso: number;
}

export interface Contacto {
  id: string;
  telefono: string;
  nombre?: string;
  estadoWhatsapp: 'desconocido' | 'activo' | 'inactivo' | 'invalido';
  estadoValidacion: 'pendiente' | 'validando' | 'completado' | 'error';
  ultimaValidacion?: string;
  creadoEn: string;
}

export interface RespuestaPaginada<T> {
  datos: T[];
  total: number;
  pagina: number;
  limite: number;
}

export interface Cliente {
  id: string;
  nombre: string;
  identificador: string;
  activa: boolean;
  ultimoLatido: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  usuario: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginRequest {
  usuario: string;
  password?: string;
}
