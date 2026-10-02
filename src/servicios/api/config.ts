const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY || '';
const API_SECRET = import.meta.env.VITE_API_SECRET || '';

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
    'X-API-SECRET': API_SECRET,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const fetchApi = async <T>(
  endpoint: string,
  opciones: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  const respuesta = await fetch(url, {
    ...opciones,
    headers: {
      ...getHeaders(),
      ...opciones.headers,
    },
  });

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  return respuesta.json();
};
