import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { validateUnibeEmail, validatePassword, checkDuplicateEmail } from '../../utils/validation';
import { Lock, AlertCircle, Shield } from 'lucide-react';

interface ImprovedLoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onGoToRegister: () => void;
  existingEmails: string[];
}

export function ImprovedLoginScreen({ onLogin, onGoToRegister, existingEmails }: ImprovedLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // Validate email
    const emailValidation = validateUnibeEmail(email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error;
    }

    // Check if user exists
    if (emailValidation.valid && !checkDuplicateEmail(email, existingEmails)) {
      newErrors.general = 'Este correo no está registrado. Por favor, crea una cuenta nueva.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#0066CC] to-[#0052A3] p-8 lg:p-12 flex items-center justify-center">
        <div className="text-white text-center max-w-md">
          <Logo size="lg" className="mx-auto mb-8 brightness-0 invert" />
          <h1 className="mb-4">Bienvenido a UNIBE Social Network</h1>
          <p className="text-white/90 mb-8">
            Conecta con estudiantes de tu universidad, comparte experiencias y construye tu red profesional de forma segura.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="flex-shrink-0 mt-1" size={20} />
              <div className="text-left">
                <p className="text-sm">Acceso seguro y verificado</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="flex-shrink-0 mt-1" size={20} />
              <div className="text-left">
                <p className="text-sm">Solo estudiantes con correo institucional <strong>@est.unibe.edu.do</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="lg:w-1/2 bg-gray-50 p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-gray-900 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600">Ingresa con tu cuenta institucional</p>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-700">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  label="Correo institucional"
                  type="email"
                  placeholder="nombre@est.unibe.edu.do"
                  value={email}
                  onChange={setEmail}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={setPassword}
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" fullWidth>
                <Lock size={18} className="mr-2" />
                Iniciar sesión segura
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">¿No tienes cuenta?</p>
              <button
                onClick={onGoToRegister}
                className="text-[#0066CC] hover:underline"
              >
                Crear cuenta nueva con correo institucional
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock size={14} />
                <span>Conexión segura y encriptada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}