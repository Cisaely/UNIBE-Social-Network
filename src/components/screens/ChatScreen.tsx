import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { OnlineIndicator } from '../OnlineIndicator';
import { MessageBubble } from '../MessageBubble';
import { User, Message } from '../../types';
import { ArrowLeft, Send } from 'lucide-react';

interface ChatScreenProps {
  currentUser: User;
  otherUser: User;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (content: string) => void;
}

export function ChatScreen({
  currentUser,
  otherUser,
  messages,
  onBack,
  onSendMessage
}: ChatScreenProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  // Filter messages for this conversation
  const conversationMessages = messages
    .filter(m => 
      (m.senderId === currentUser.id && m.receiverId === otherUser.id) ||
      (m.senderId === otherUser.id && m.receiverId === currentUser.id)
    )
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={onBack}
              className="text-[#0066CC] hover:text-[#0052A3] transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="relative">
              <ImageWithFallback
                src={otherUser.photo}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0">
                <OnlineIndicator isOnline={otherUser.isOnline} size="sm" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-gray-900">{otherUser.name}</h3>
              <div className="flex items-center gap-2">
                <OnlineIndicator 
                  isOnline={otherUser.isOnline} 
                  lastSeen={otherUser.lastSeen}
                  showText 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {conversationMessages.length > 0 ? (
            <>
              {conversationMessages.map(message => (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                  isSent={message.senderId === currentUser.id}
                  isRead={message.read}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay mensajes aún</p>
              <p className="text-gray-400 mt-2">Envía el primer mensaje</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-[#0066CC] text-white p-3 rounded-full hover:bg-[#0052A3] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
