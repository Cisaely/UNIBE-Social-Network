import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './Button';
import { OnlineIndicator } from './OnlineIndicator';

interface UserCardProps {
  name: string;
  career: string;
  photo: string;
  onAction?: () => void;
  actionLabel?: string;
  actionVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
  showAction?: boolean;
  isOnline?: boolean;
  lastSeen?: Date;
}

export function UserCard({ 
  name, 
  career, 
  photo, 
  onAction, 
  actionLabel = 'Agregar',
  actionVariant = 'primary',
  showAction = true,
  isOnline = false,
  lastSeen
}: UserCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4">
      <div className="relative">
        <ImageWithFallback
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0">
          <OnlineIndicator isOnline={isOnline} size="sm" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-gray-900 truncate">{name}</h3>
        <p className="text-gray-500 truncate">{career}</p>
      </div>
      {showAction && onAction && (
        <Button variant={actionVariant} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}