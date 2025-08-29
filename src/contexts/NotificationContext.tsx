import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  unreadCount: number;
  addNotification: (notification: any) => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(2); // Mock unread count

  const addNotification = (notification: any) => {
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id: string) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <NotificationContext.Provider value={{ unreadCount, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};