import { Button } from '../Button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { OnlineIndicator } from '../OnlineIndicator';
import { Logo } from '../Logo';
import { User } from '../../types';
import { ArrowLeft, Users } from 'lucide-react';

interface MutualFriendsScreenProps {
  user1: User;
  user2: User;
  users: User[];
  onBack: () => void;
}

export function MutualFriendsScreen({ 
  user1, 
  user2, 
  users, 
  onBack 
}: MutualFriendsScreenProps) {
  const mutualFriendIds = user1.friends.filter(friendId => 
    user2.friends.includes(friendId)
  );
  const mutualFriends = users.filter(u => mutualFriendIds.includes(u.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={onBack}
              className="text-[#0066CC] hover:text-[#0052A3]"
            >
              <ArrowLeft size={24} />
            </button>
            <Logo size="sm" />
            <h2 className="text-gray-900">Amigos en común</h2>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Users Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="relative inline-block mb-3">
                <ImageWithFallback
                  src={user1.photo}
                  alt={user1.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0">
                  <OnlineIndicator isOnline={user1.isOnline} size="sm" />
                </div>
              </div>
              <p className="text-gray-900">{user1.name}</p>
              <p className="text-gray-500">{user1.career}</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-[#0066CC] p-3 rounded-full">
                <Users size={24} className="text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block mb-3">
                <ImageWithFallback
                  src={user2.photo}
                  alt={user2.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0">
                  <OnlineIndicator isOnline={user2.isOnline} size="sm" />
                </div>
              </div>
              <p className="text-gray-900">{user2.name}</p>
              <p className="text-gray-500">{user2.career}</p>
            </div>
          </div>
        </div>

        {/* Mutual Friends List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">
            {mutualFriends.length} {mutualFriends.length === 1 ? 'amigo' : 'amigos'} en común
          </h3>
          
          {mutualFriends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mutualFriends.map(friend => (
                <div
                  key={friend.id}
                  className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={friend.photo}
                      alt={friend.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0">
                      <OnlineIndicator isOnline={friend.isOnline} size="sm" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">{friend.name}</p>
                    <p className="text-gray-500 truncate">{friend.career}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500">No tienen amigos en común</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}