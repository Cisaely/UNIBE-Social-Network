interface OnlineIndicatorProps {
  isOnline: boolean;
  size?: 'sm' | 'md';
  showText?: boolean;
  lastSeen?: Date;
}

export function OnlineIndicator({ 
  isOnline, 
  size = 'sm', 
  showText = false,
  lastSeen 
}: OnlineIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3'
  };

  const getLastSeenText = () => {
    if (!lastSeen) return 'Desconectado';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    return `Hace ${diffDays} d`;
  };

  return (
    <div className="flex items-center gap-1.5">
      <div 
        className={`${sizeClasses[size]} rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      {showText && (
        <span className="text-xs text-gray-600">
          {isOnline ? 'En línea' : getLastSeenText()}
        </span>
      )}
    </div>
  );
}
