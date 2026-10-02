import { Dashboard } from './paginas/dashboard/Dashboard';
import { Login } from './paginas/login/Login';
import { useAuth } from './hooks/useAuth';

function App() {
  const { token, cargando, iniciarSesion } = useAuth();

  if (cargando) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Cargando...</div>;
  }

  if (!token) {
    return <Login onLogin={iniciarSesion} />;
  }

  return <Dashboard />;
}

export default App;
