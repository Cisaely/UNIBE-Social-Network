import { ImageWithFallback } from './figma/ImageWithFallback';
import { OnlineIndicator } from './OnlineIndicator';
import { NotificationBadge } from './NotificationBadge';

interface ConversationCardProps {
  name: string;
  photo: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  onClick: () => void;
}

export function ConversationCard({
  name,
  photo,
  lastMessage,
  timestamp,
  unreadCount,
  isOnline,
  onClick
}: ConversationCardProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours} h`;
    return `${diffDays} d`;
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center gap-4 transition-colors text-left"
    >
      <div className="relative">
        <ImageWithFallback
          src={photo}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0">
          <OnlineIndicator isOnline={isOnline} size="md" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`truncate ${unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
            {name}
          </h3>
          <span className="text-xs text-gray-500 ml-2">{formatTime(timestamp)}</span>
        </div>
        <p className={`text-sm truncate ${unreadCount > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
          {lastMessage}
        </p>
      </div>

      {unreadCount > 0 && (
        <div className="relative">
          <NotificationBadge count={unreadCount} />
        </div>
      )}
    </button>
  );
}
