import { useState } from 'react';
import { NavBar } from '../NavBar';
import { Button } from '../Button';
import { Input } from '../Input';
import { Screen } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { Lock, Bell, Shield, Moon, Sun, LogOut, AlertTriangle } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  requestCount: number;
  messageCount: number;
}

/**
 * PANTALLA DE CONFIGURACIÓN
 * 
 * Permite al usuario:
 * - Cambiar su contraseña
 * - Activar/desactivar notificaciones
 * - Cambiar entre modo claro y oscuro
 * - Ver información de privacidad
 * - Reportar problemas
 * - Cerrar sesión
 */
export function SettingsScreen({ 
  onNavigate, 
  onLogout,
  requestCount,
  messageCount
}: SettingsScreenProps) {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Contraseña actualizada correctamente');
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <NavBar 
        activeTab="settings" 
        onTabChange={(tab) => onNavigate(tab as Screen)}
        requestCount={requestCount}
        messageCount={messageCount}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className={`${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Configuración</h2>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-[#0066CC]" size={24} />
            <h3 className="text-gray-900">Seguridad</h3>
          </div>

          {!showPasswordChange ? (
            <button
              onClick={() => setShowPasswordChange(true)}
              className="flex items-center gap-2 text-[#0066CC] hover:text-[#0052A3]"
            >
              <Lock size={18} />
              Cambiar contraseña
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                label="Contraseña actual"
                type="password"
                value={currentPassword}
                onChange={setCurrentPassword}
                required
              />
              <Input
                label="Nueva contraseña"
                type="password"
                value={newPassword}
                onChange={setNewPassword}
                required
              />
              <div className="flex gap-3">
                <Button type="submit">Guardar</Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowPasswordChange(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-[#0066CC]" size={24} />
              <div>
                <h3 className="text-gray-900">Notificaciones</h3>
                <p className="text-gray-500">Recibir alertas de mensajes y solicitudes</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-colors ${
                notifications ? 'bg-[#0066CC]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon className="text-[#0066CC]" size={24} />
              ) : (
                <Sun className="text-[#0066CC]" size={24} />
              )}
              <div>
                <h3 className="text-gray-900">Modo oscuro</h3>
                <p className="text-gray-500">Tema visual de la aplicación</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full transition-colors ${
                isDark ? 'bg-[#0066CC]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  isDark ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-[#0066CC]" size={24} />
            <h3 className="text-gray-900">Privacidad</h3>
          </div>
          <div className="space-y-3 text-gray-600">
            <p>• Solo estudiantes de UNIBE pueden ver tu perfil</p>
            <p>• Tu correo institucional está protegido</p>
            <p>• Puedes reportar contenido inapropiado</p>
          </div>
        </div>

        {/* Report */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-gray-900 mb-2">Reportar problema</h3>
              <p className="text-gray-600 mb-4">
                Si encuentras perfiles falsos o comportamiento inapropiado, repórtalo de inmediato.
              </p>
              <Button variant="outline">
                Enviar reporte
              </Button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <Button 
            variant="danger" 
            onClick={onLogout}
            fullWidth
          >
            <LogOut size={18} className="mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}