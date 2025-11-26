export interface User {
  id: string;
  name: string;
  email: string;
  career: string;
  semester: string;
  bio: string;
  photo: string;
  studentId: string;
  friends: string[];
  isOnline: boolean;
  lastSeen?: Date;
}

export interface FriendRequest {
  id: string;
  from: User;
  timestamp: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  userId: string;
  lastMessage: Message;
  unreadCount: number;
}

export type Screen = 
  | 'login' 
  | 'createProfile' 
  | 'home' 
  | 'search' 
  | 'requests' 
  | 'profile'
  | 'userProfile'
  | 'mutualFriends'
  | 'suggestions'
  | 'messages'
  | 'chat'
  | 'settings';
