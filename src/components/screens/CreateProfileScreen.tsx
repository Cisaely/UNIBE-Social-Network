import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { User } from '../../App';
import { Camera } from 'lucide-react';

interface CreateProfileScreenProps {
  onCreateProfile: (profile: Omit<User, 'id' | 'friends'>) => void;
}

export function CreateProfileScreen({ onCreateProfile }: CreateProfileScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [career, setCareer] = useState('');
  const [semester, setSemester] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1639654655546-68bc1f21e9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzkzODU5Mnww&ixlib=rb-4.1.0&q=80&w=1080');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProfile({ name, email, career, semester, bio, photo });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066CC] to-[#0052A3] px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-[#0066CC] text-center mb-2">Crear tu perfil</h1>
        <p className="text-gray-600 text-center mb-8">Completa tu información para comenzar</p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-[#0066CC] text-white p-2 rounded-full hover:bg-[#0052A3] transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            <p className="text-gray-500 mt-2">Foto de perfil</p>
          </div>

          <Input
            label="Nombre completo"
            placeholder="Ej: Juan Pérez"
            value={name}
            onChange={setName}
            required
          />

          <Input
            label="Correo institucional"
            type="email"
            placeholder="tu.nombre@unibe.edu.do"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            label="Carrera"
            placeholder="Ej: Ingeniería de Sistemas"
            value={career}
            onChange={setCareer}
            required
          />

          <Input
            label="Cuatrimestre"
            placeholder="Ej: 3ro"
            value={semester}
            onChange={setSemester}
            required
          />

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Bio breve
            </label>
            <textarea
              placeholder="Cuéntanos sobre ti..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none"
            />
          </div>

          <div className="mt-6">
            <Button type="submit" fullWidth>
              Guardar perfil
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
