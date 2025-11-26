import { useState, useRef } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { User } from '../../types';
import { validateUnibeEmail, validateStudentId, checkDuplicateEmail, validatePassword } from '../../utils/validation';
import { Camera, AlertCircle, Shield, User as UserIcon, Check, X } from 'lucide-react';

interface ImprovedCreateProfileScreenProps {
  onCreateProfile: (profile: Omit<User, 'id' | 'friends' | 'isOnline'>) => void;
  existingEmails: string[];
}

/**
 * PANTALLA DE CREACIÓN DE PERFIL
 * 
 * Permite a nuevos usuarios registrarse en la plataforma con:
 * - Validación estricta de correo institucional (@est.unibe.edu.do)
 * - Validación de matrícula (formato AA-####)
 * - Validación de contraseña segura (mayúsculas, minúsculas, especiales)
 * - Carga de foto de perfil desde el dispositivo
 * - Selección de carrera y cuatrimestre
 */
export function ImprovedCreateProfileScreen({ onCreateProfile, existingEmails }: ImprovedCreateProfileScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [career, setCareer] = useState('');
  const [semester, setSemester] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(''); // Vacío por defecto - sin foto
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Lista actualizada de carreras disponibles en UNIBE
   */
  const careers = [
    'TICS / Ingeniería en Tecnologías Computacionales',
    'Medicina',
    'Arquitectura',
    'Gestión Empresarial',
    'Psicología',
    'Ingeniería Industrial',
    'Derecho',
    'Comunicación',
    'Contabilidad',
    'BBA',
    'Estudios Liberales'
  ];

  /**
   * Cuatrimestres del 1 al 18
   */
  const semesters = Array.from({ length: 18 }, (_, i) => `${i + 1}`);

  /**
   * Maneja la selección de foto de perfil
   * Abre el explorador de archivos del dispositivo
   */
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Procesa la imagen seleccionada y la convierte a base64
   * para mostrarla en la vista previa
   */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, photo: 'Por favor selecciona un archivo de imagen' });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, photo: 'La imagen debe ser menor a 5MB' });
        return;
      }

      // Leer y convertir a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        const newErrors = { ...errors };
        delete newErrors.photo;
        setErrors(newErrors);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Actualiza los requisitos de la contraseña en tiempo real
   */
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const validation = validatePassword(value);
    if (validation.requirements) {
      setPasswordRequirements(validation.requirements);
    }
  };

  /**
   * Valida y procesa el formulario de registro
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validar email
    const emailValidation = validateUnibeEmail(email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error!;
    } else if (checkDuplicateEmail(email, existingEmails)) {
      newErrors.email = 'Este correo ya está registrado. Por favor, inicia sesión.';
    }

    // Validar matrícula
    const idValidation = validateStudentId(studentId);
    if (!idValidation.valid) {
      newErrors.studentId = idValidation.error!;
    }

    // Validar contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error!;
    }

    // Validar otros campos
    if (!name.trim()) newErrors.name = 'El nombre es requerido';
    if (!career) newErrors.career = 'Debes seleccionar una carrera';
    if (!semester) newErrors.semester = 'Debes seleccionar un cuatrimestre';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCreateProfile({ 
      name, 
      email, 
      career, 
      semester, 
      bio, 
      photo: photo || '', // Si no hay foto, enviar string vacío
      studentId 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] p-8 text-white text-center">
            <Logo size="lg" className="mx-auto mb-4 brightness-0 invert" />
            <h1 className="mb-2">Crear tu perfil estudiantil</h1>
            <p className="text-white/90">
              Completa tu información para unirte a la comunidad UNIBE
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Shield className="text-[#0066CC] flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-[#0066CC]">
                  Solo estudiantes con correo institucional <strong>@est.unibe.edu.do</strong> pueden registrarse
                </p>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={48} className="text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 bg-[#0066CC] text-white p-2.5 rounded-full hover:bg-[#0052A3] transition-colors shadow-lg"
                >
                  <Camera size={18} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
              <p className="text-gray-500 mt-3">Foto de perfil (opcional)</p>
              {errors.photo && (
                <p className="text-red-600 text-sm mt-1">{errors.photo}</p>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Nombre completo"
                  placeholder="Ej: Juan Pérez"
                  value={name}
                  onChange={setName}
                  required
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Matrícula"
                  placeholder="24-1197"
                  value={studentId}
                  onChange={setStudentId}
                  required
                />
                {errors.studentId && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.studentId}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
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

            <div className="mt-6">
              <Input
                label="Contraseña"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              
              {/* Password Requirements */}
              <div className="mt-3 space-y-2">
                <div className={`flex items-center gap-2 text-sm ${passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.length ? <Check size={16} /> : <X size={16} />}
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.uppercase ? <Check size={16} /> : <X size={16} />}
                  <span>Al menos una letra mayúscula</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.lowercase ? <Check size={16} /> : <X size={16} />}
                  <span>Al menos una letra minúscula</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${passwordRequirements.special ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordRequirements.special ? <Check size={16} /> : <X size={16} />}
                  <span>Al menos un carácter especial (!@#$%^&*)</span>
                </div>
              </div>

              {errors.password && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 mb-2">Carrera</label>
                <select
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                >
                  <option value="">Selecciona una carrera</option>
                  {careers.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.career && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.career}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Cuatrimestre</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                >
                  <option value="">Selecciona cuatrimestre</option>
                  {semesters.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.semester && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.semester}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 mb-2">Bio breve (opcional)</label>
              <textarea
                placeholder="Cuéntanos sobre ti, tus intereses y objetivos..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none"
              />
            </div>

            <div className="mt-8">
              <Button type="submit" fullWidth>
                Crear perfil
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
