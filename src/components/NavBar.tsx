import { Home, Search, UserPlus, User, MessageCircle, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { NotificationBadge } from './NotificationBadge';

interface NavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  requestCount?: number;
  messageCount?: number;
}

export function NavBar({ activeTab, onTabChange, requestCount = 0, messageCount = 0 }: NavBarProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'messages', icon: MessageCircle, label: 'Mensajes', badge: messageCount },
    { id: 'requests', icon: UserPlus, label: 'Solicitudes', badge: requestCount },
    { id: 'profile', icon: User, label: 'Perfil' },
    { id: 'settings', icon: Settings, label: 'Ajustes' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div className="hidden sm:block">
              <span className="text-[#0066CC]">UNIBE Social Network</span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                    activeTab === tab.id ? 'text-[#0066CC]' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="relative">
                    <Icon size={22} />
                    {tab.badge && tab.badge > 0 && (
                      <NotificationBadge count={tab.badge} />
                    )}
                  </div>
                  <span className="text-xs hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}