import { NavBar } from '../NavBar';
import { Button } from '../Button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { OnlineIndicator } from '../OnlineIndicator';
import { User, Screen } from '../../types';
import { ArrowLeft, Users as UsersIcon, MessageCircle } from 'lucide-react';

interface ProfileScreenProps {
  user: User;
  users: User[];
  onNavigate: (screen: Screen) => void;
  isOwnProfile: boolean;
  currentUserId?: string;
  onSendRequest?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  onViewMutualFriends?: () => void;
  requestCount?: number;
  messageCount?: number;
}

export function ProfileScreen({ 
  user, 
  users, 
  onNavigate, 
  isOwnProfile,
  currentUserId,
  onSendRequest,
  onViewProfile,
  onViewMutualFriends,
  requestCount = 0,
  messageCount = 0
}: ProfileScreenProps) {
  const friends = users.filter(u => user.friends.includes(u.id));
  const isFriend = currentUserId && user.friends.includes(currentUserId);

  return (
    <div className="min-h-screen bg-gray-50">
      {isOwnProfile ? (
        <NavBar 
          activeTab="profile" 
          onTabChange={(tab) => onNavigate(tab as Screen)}
          requestCount={requestCount}
          messageCount={messageCount}
        />
      ) : (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 h-16">
              <button
                onClick={() => onNavigate('search')}
                className="text-[#0066CC] hover:text-[#0052A3]"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-gray-900">Perfil</h2>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <div className="relative">
              <ImageWithFallback
                src={user.photo}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              <div className="absolute bottom-2 right-2">
                <OnlineIndicator isOnline={user.isOnline} size="md" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-1">{user.career}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-500 mb-4">
                <span>{user.semester} cuatrimestre</span>
                <span className="text-gray-400">•</span>
                <span>ID: {user.studentId}</span>
                <span className="text-gray-400">•</span>
                <OnlineIndicator 
                  isOnline={user.isOnline} 
                  lastSeen={user.lastSeen}
                  showText 
                />
              </div>
              
              {!isOwnProfile && onSendRequest && (
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button
                    variant={isFriend ? 'secondary' : 'primary'}
                    onClick={() => onSendRequest(user.id)}
                  >
                    {isFriend ? 'Amigos' : 'Agregar amigo'}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle size={18} className="mr-2" />
                    Mensaje
                  </Button>
                  {onViewMutualFriends && (
                    <Button variant="outline" onClick={onViewMutualFriends}>
                      <UsersIcon size={18} className="mr-2" />
                      Amigos en común
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-gray-900 mb-2">Bio</h3>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>

        {/* Friends Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Amigos ({friends.length})</h3>
          </div>
          
          {friends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {friends.map(friend => (
                <div
                  key={friend.id}
                  onClick={() => onViewProfile?.(friend.id)}
                  className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={friend.photo}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0">
                      <OnlineIndicator isOnline={friend.isOnline} size="sm" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate group-hover:text-[#0066CC] transition-colors">{friend.name}</p>
                    <p className="text-gray-500 truncate">{friend.career}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500">
                {isOwnProfile ? 'Aún no tienes amigos' : 'Este usuario no tiene amigos aún'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}