import { NavBar } from '../NavBar';
import { FriendRequestCard } from '../FriendRequestCard';
import { FriendRequest, Screen } from '../../types';
import { UserPlus } from 'lucide-react';

interface RequestsScreenProps {
  requests: FriendRequest[];
  onNavigate: (screen: Screen) => void;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  requestCount?: number;
  messageCount?: number;
}

export function RequestsScreen({ 
  requests, 
  onNavigate, 
  onAccept, 
  onReject,
  requestCount = 0,
  messageCount = 0
}: RequestsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        activeTab="requests" 
        onTabChange={(tab) => onNavigate(tab as Screen)}
        requestCount={requestCount}
        messageCount={messageCount}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-gray-900 mb-6">Solicitudes de amistad</h2>

        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map(request => (
              <FriendRequestCard
                key={request.id}
                name={request.from.name}
                career={request.from.career}
                photo={request.from.photo}
                onAccept={() => onAccept(request.id)}
                onReject={() => onReject(request.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <UserPlus size={32} className="text-gray-400" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-2">No tienes solicitudes pendientes</h3>
            <p className="text-gray-500">
              Las solicitudes de amistad aparecerán aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
}