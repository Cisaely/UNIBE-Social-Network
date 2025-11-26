import { Button } from '../Button';
import { UserCard } from '../UserCard';
import { Logo } from '../Logo';
import { User } from '../../types';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface SuggestionsScreenProps {
  currentUser: User;
  users: User[];
  onBack: () => void;
  onSendRequest: (userId: string) => void;
}

export function SuggestionsScreen({ 
  currentUser, 
  users, 
  onBack, 
  onSendRequest 
}: SuggestionsScreenProps) {
  // Smart suggestions: users from same career or semester
  const sameCareers = users.filter(u => 
    u.id !== currentUser.id && 
    !currentUser.friends.includes(u.id) &&
    u.career === currentUser.career
  );

  const sameSemester = users.filter(u => 
    u.id !== currentUser.id && 
    !currentUser.friends.includes(u.id) &&
    u.semester === currentUser.semester &&
    u.career !== currentUser.career
  );

  const others = users.filter(u => 
    u.id !== currentUser.id && 
    !currentUser.friends.includes(u.id) &&
    u.career !== currentUser.career &&
    u.semester !== currentUser.semester
  );

  const allSuggestions = [...sameCareers, ...sameSemester, ...others];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={onBack}
              className="text-[#0066CC] hover:text-[#0052A3]"
            >
              <ArrowLeft size={24} />
            </button>
            <Logo size="sm" />
            <h2 className="text-gray-900">Sugerencias de amigos</h2>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] rounded-2xl shadow-lg p-6 mb-6 text-white flex items-center gap-3">
          <Sparkles size={28} />
          <div>
            <h3 className="mb-1">Personas que quizás conozcas</h3>
            <p className="text-white/90">
              Basado en tu carrera, cuatrimestre y conexiones en común
            </p>
          </div>
        </div>

        {/* Same Career Section */}
        {sameCareers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4">De tu misma carrera</h3>
            <div className="space-y-3">
              {sameCareers.map(user => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  career={user.career}
                  photo={user.photo}
                  isOnline={user.isOnline}
                  lastSeen={user.lastSeen}
                  onAction={() => onSendRequest(user.id)}
                  actionLabel="Agregar"
                />
              ))}
            </div>
          </div>
        )}

        {/* Same Semester Section */}
        {sameSemester.length > 0 && (
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4">Del mismo cuatrimestre</h3>
            <div className="space-y-3">
              {sameSemester.map(user => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  career={user.career}
                  photo={user.photo}
                  isOnline={user.isOnline}
                  lastSeen={user.lastSeen}
                  onAction={() => onSendRequest(user.id)}
                  actionLabel="Agregar"
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Suggestions */}
        {others.length > 0 && (
          <div>
            <h3 className="text-gray-900 mb-4">Otros estudiantes</h3>
            <div className="space-y-3">
              {others.map(user => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  career={user.career}
                  photo={user.photo}
                  isOnline={user.isOnline}
                  lastSeen={user.lastSeen}
                  onAction={() => onSendRequest(user.id)}
                  actionLabel="Agregar"
                />
              ))}
            </div>
          </div>
        )}

        {allSuggestions.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No hay sugerencias disponibles en este momento</p>
            <p className="text-gray-400 mt-2">Ya has conectado con muchos estudiantes</p>
          </div>
        )}
      </div>
    </div>
  );
}