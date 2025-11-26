import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';

interface LoginScreenProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

export function LoginScreen({ onLogin, onGoToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0066CC] to-[#0052A3] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-[#0066CC] mb-2">UNIBE Social Network</h1>
          <p className="text-gray-600">Conecta con estudiantes de tu universidad</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Correo institucional"
            type="email"
            placeholder="tu.nombre@unibe.edu.do"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            required
          />

          <div className="mt-6">
            <Button type="submit" fullWidth>
              Iniciar sesión
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onGoToRegister}
            className="text-[#0066CC] hover:underline"
          >
            Crear cuenta nueva
          </button>
        </div>
      </div>
    </div>
  );
}
