import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  timestamp: Date;
  isSent: boolean;
  isRead: boolean;
}

export function MessageBubble({ content, timestamp, isSent, isRead }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-DO', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isSent ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isSent
              ? 'bg-[#0066CC] text-white rounded-br-none'
              : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }`}
        >
          <p>{content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 px-2 ${isSent ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">{formatTime(timestamp)}</span>
          {isSent && (
            <div className="text-gray-500">
              {isRead ? <CheckCheck size={14} /> : <Check size={14} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
