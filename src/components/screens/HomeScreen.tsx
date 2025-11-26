import { NavBar } from '../NavBar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { OnlineIndicator } from '../OnlineIndicator';
import { User, Screen } from '../../types';
import { Users, UserPlus, MessageCircle, TrendingUp } from 'lucide-react';

interface HomeScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onViewSuggestions: () => void;
  requestCount?: number;
  messageCount?: number;
}

export function HomeScreen({ 
  user, 
  onNavigate, 
  onViewSuggestions,
  requestCount = 0,
  messageCount = 0
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        activeTab="home" 
        onTabChange={(tab) => onNavigate(tab as Screen)}
        requestCount={requestCount}
        messageCount={messageCount}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ImageWithFallback
                src={user.photo}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0">
                <OnlineIndicator isOnline={user.isOnline} size="md" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600">{user.career}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-500">{user.semester} cuatrimestre</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">ID: {user.studentId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => onNavigate('requests')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="text-2xl text-[#0066CC] mb-1">{requestCount}</div>
            <div className="text-xs text-gray-600">Solicitudes</div>
          </button>
          <button
            onClick={() => onNavigate('messages')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="text-2xl text-[#0066CC] mb-1">{messageCount}</div>
            <div className="text-xs text-gray-600">Mensajes nuevos</div>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="text-2xl text-[#0066CC] mb-1">{user.friends.length}</div>
            <div className="text-xs text-gray-600">Amigos</div>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl shadow-lg p-8 mb-6 text-white">
          <h2 className="mb-4">¡Bienvenido a UNIBE Social Network!</h2>
          <p className="mb-6 text-white/90">
            Conecta con estudiantes de tu universidad, comparte experiencias y construye tu red profesional de forma segura.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('search')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all rounded-xl p-4 flex items-center gap-3 group"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                <Users size={24} />
              </div>
              <div className="text-left">
                <p>Buscar estudiantes</p>
                <p className="text-white/80">Encuentra compañeros</p>
              </div>
            </button>
            
            <button
              onClick={onViewSuggestions}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all rounded-xl p-4 flex items-center gap-3 group"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                <UserPlus size={24} />
              </div>
              <div className="text-left">
                <p>Sugerencias</p>
                <p className="text-white/80">Personas que quizás conozcas</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('messages')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all rounded-xl p-4 flex items-center gap-3 group"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                <MessageCircle size={24} />
              </div>
              <div className="text-left">
                <p>Mensajes</p>
                <p className="text-white/80">Chatea con amigos</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all rounded-xl p-4 flex items-center gap-3 group"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                <TrendingUp size={24} />
              </div>
              <div className="text-left">
                <p>Mi perfil</p>
                <p className="text-white/80">Ver mis conexiones</p>
              </div>
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">Actividad reciente</h3>
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No hay publicaciones recientes</p>
            <p className="text-gray-400 mt-2">Comienza a conectar con otros estudiantes</p>
          </div>
        </div>
      </div>
    </div>
  );
}