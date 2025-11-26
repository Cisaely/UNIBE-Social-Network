import { Lock } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';

interface SecureRouteProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  children: React.ReactNode;
}

export function SecureRoute({ isAuthenticated, onLogin, children }: SecureRouteProps) {
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <Lock size={48} className="text-red-600" />
            </div>
          </div>
          
          <Logo size="lg" className="mx-auto mb-4" />
          
          <h2 className="text-gray-900 mb-3">Acceso Restringido</h2>
          
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión con tu cuenta institucional de UNIBE para acceder a esta aplicación.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              Solo estudiantes con correo @est.unibe.edu.do pueden acceder
            </p>
          </div>
          
          <Button onClick={onLogin} fullWidth>
            Ir a Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}