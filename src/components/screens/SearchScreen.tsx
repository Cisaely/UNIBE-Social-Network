import { useState } from 'react';
import { NavBar } from '../NavBar';
import { UserCard } from '../UserCard';
import { SearchFilters } from '../SearchFilters';
import { User, Screen } from '../../types';
import { Search } from 'lucide-react';

interface SearchScreenProps {
  currentUser: User;
  users: User[];
  onNavigate: (screen: Screen) => void;
  onSendRequest: (userId: string) => void;
  onViewProfile: (userId: string) => void;
  requestCount?: number;
  messageCount?: number;
}

export function SearchScreen({ 
  currentUser, 
  users, 
  onNavigate, 
  onSendRequest,
  onViewProfile,
  requestCount = 0,
  messageCount = 0
}: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('Todas');
  const [selectedSemester, setSelectedSemester] = useState('Todos');

  const filteredUsers = users
    .filter(u => u.id !== currentUser.id)
    .filter(u => 
      (searchQuery === '' || 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.career.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.studentId.includes(searchQuery))
    )
    .filter(u => selectedCareer === 'Todas' || u.career === selectedCareer)
    .filter(u => selectedSemester === 'Todos' || u.semester === selectedSemester);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        activeTab="search" 
        onTabChange={(tab) => onNavigate(tab as Screen)}
        requestCount={requestCount}
        messageCount={messageCount}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-gray-900 mb-6">Buscar estudiantes</h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, carrera o ID estudiantil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent shadow-sm"
          />
        </div>

        {/* Filters */}
        <SearchFilters
          selectedCareer={selectedCareer}
          selectedSemester={selectedSemester}
          onCareerChange={setSelectedCareer}
          onSemesterChange={setSelectedSemester}
        />

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'estudiante encontrado' : 'estudiantes encontrados'}
          </p>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} onClick={() => onViewProfile(user.id)} className="cursor-pointer">
                <UserCard
                  name={user.name}
                  career={user.career}
                  photo={user.photo}
                  isOnline={user.isOnline}
                  lastSeen={user.lastSeen}
                  onAction={(e) => {
                    e?.stopPropagation();
                    onSendRequest(user.id);
                  }}
                  actionLabel={
                    currentUser.friends.includes(user.id) 
                      ? 'Amigos' 
                      : 'Agregar'
                  }
                  actionVariant={
                    currentUser.friends.includes(user.id)
                      ? 'secondary'
                      : 'primary'
                  }
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500">No se encontraron estudiantes</p>
              <p className="text-gray-400 mt-2">Intenta con otros filtros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}