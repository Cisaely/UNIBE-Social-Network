import { NavBar } from '../NavBar';
import { ConversationCard } from '../ConversationCard';
import { User, Message, Conversation, Screen } from '../../types';
import { MessageCircle } from 'lucide-react';

interface MessagesScreenProps {
  currentUser: User;
  users: User[];
  messages: Message[];
  onNavigate: (screen: Screen) => void;
  onSelectChat: (userId: string) => void;
  requestCount: number;
  messageCount: number;
}

export function MessagesScreen({
  currentUser,
  users,
  messages,
  onNavigate,
  onSelectChat,
  requestCount,
  messageCount
}: MessagesScreenProps) {
  // Group messages by conversation
  const conversations: Conversation[] = [];
  const conversationMap = new Map<string, Message[]>();

  messages.forEach(msg => {
    const otherUserId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
    if (!conversationMap.has(otherUserId)) {
      conversationMap.set(otherUserId, []);
    }
    conversationMap.get(otherUserId)!.push(msg);
  });

  conversationMap.forEach((msgs, userId) => {
    const sortedMsgs = msgs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const lastMessage = sortedMsgs[0];
    const unreadCount = msgs.filter(m => 
      m.receiverId === currentUser.id && !m.read
    ).length;

    conversations.push({
      userId,
      lastMessage,
      unreadCount
    });
  });

  // Sort by most recent message
  conversations.sort((a, b) => 
    b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        activeTab="messages" 
        onTabChange={(tab) => onNavigate(tab as Screen)}
        requestCount={requestCount}
        messageCount={messageCount}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-gray-900 mb-6">Mensajes</h2>

        {conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map(conv => {
              const user = users.find(u => u.id === conv.userId);
              if (!user) return null;

              return (
                <ConversationCard
                  key={conv.userId}
                  name={user.name}
                  photo={user.photo}
                  lastMessage={conv.lastMessage.content}
                  timestamp={conv.lastMessage.timestamp}
                  unreadCount={conv.unreadCount}
                  isOnline={user.isOnline}
                  onClick={() => onSelectChat(user.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <MessageCircle size={32} className="text-gray-400" />
              </div>
            </div>
            <h3 className="text-gray-900 mb-2">No hay conversaciones</h3>
            <p className="text-gray-500">
              Busca estudiantes y comienza a chatear
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
