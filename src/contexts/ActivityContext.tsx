import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Activity {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'In Progress' | 'Attended';
  startDate: string;
  programId: string;
  type: 'program' | 'event' | 'workshop';
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'startDate'>) => void;
  updateActivityStatus: (id: string, status: Activity['status']) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Leadership Program',
      description: 'Community Leadership Development Course',
      status: 'Active',
      startDate: '2024-01-15',
      programId: 'community-engagement',
      type: 'program'
    },
    {
      id: '2',
      title: 'Career Workshop',
      description: 'Professional Development Workshop Series',
      status: 'Completed',
      startDate: '2024-01-10',
      programId: 'employment',
      type: 'workshop'
    },
    {
      id: '3',
      title: 'Community Event',
      description: 'Monthly Community Networking Event',
      status: 'Attended',
      startDate: '2024-01-05',
      programId: 'community',
      type: 'event'
    }
  ]);

  const addActivity = (newActivity: Omit<Activity, 'id' | 'startDate'>) => {
    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString(),
      startDate: new Date().toISOString().split('T')[0]
    };
    setActivities(prev => [activity, ...prev]);
  };

  const updateActivityStatus = (id: string, status: Activity['status']) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, status } : activity
      )
    );
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, updateActivityStatus }}>
      {children}
    </ActivityContext.Provider>
  );
};