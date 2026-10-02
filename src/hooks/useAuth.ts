import { useState, useEffect } from 'react';
import { loginApi, obtenerSesionApi } from '../servicios/api/auth.api';
import type { LoginRequest, Usuario } from '../tipos';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      if (token) {
        try {
          const user = await obtenerSesionApi();
          setUsuario(user);
        } catch (error) {
          cerrarSesion();
        }
      }
      setCargando(false);
    };
    
    verificarSesion();
  }, [token]);

  const iniciarSesion = async (credenciales: LoginRequest) => {
    const datos = await loginApi(credenciales);
    localStorage.setItem('token', datos.token);
    setToken(datos.token);
    setUsuario(datos.usuario);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return { token, usuario, cargando, iniciarSesion, cerrarSesion };
};
