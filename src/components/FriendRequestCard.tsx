import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './Button';
import { Check, X } from 'lucide-react';

interface FriendRequestCardProps {
  name: string;
  career: string;
  photo: string;
  onAccept: () => void;
  onReject: () => void;
}

export function FriendRequestCard({ 
  name, 
  career, 
  photo, 
  onAccept, 
  onReject 
}: FriendRequestCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4 mb-4">
        <ImageWithFallback
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-gray-900">{name}</h3>
          <p className="text-gray-500">{career}</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="flex-1 bg-[#0066CC] text-white px-4 py-2 rounded-lg hover:bg-[#0052A3] transition-colors flex items-center justify-center gap-2"
        >
          <Check size={18} />
          Aceptar
        </button>
        <button
          onClick={onReject}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <X size={18} />
          Rechazar
        </button>
      </div>
    </div>
  );
}
