import React from 'react';
import { v4 as uuid } from 'uuid';

import { Notification, NotificationOptions } from '../types';
import { NotificationList } from '../components/NotificationList';

interface NotificationContextParams {
  /**
   * Sends a notification
   * @param message Message to display on the notification
   * @param options options used to configure notification
   */
  notify: (message: string, options?: NotificationOptions) => void;
  /**
   * clears a single notification or all notifications
   * @param notificationId Optionally provide the ID of the notification to clear
   * or omit to clear all
   */
  clearNotifications: (notificationId?: string) => void;
}

export const NotificationContext =
  React.createContext<NotificationContextParams>({
    notify: () => {},
    clearNotifications: () => {},
  });

interface NotificationContextProviderProps {
  children: React.ReactNode;
}

export const NotificationContextProvider = ({
  children,
}: NotificationContextProviderProps) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const notify = (message: string, options?: NotificationOptions) => {
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id: uuid(), message, options },
    ]);
  };

  const clearNotifications = (notificationId?: string) => {
    // clears all when no id provided
    if (!notificationId) {
      setNotifications([]);
      return;
    }

    // removes single notification by id
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <NotificationContext.Provider value={{ notify, clearNotifications }}>
      <div className="absolute max-w-full top-20 right-4">
        <NotificationList notifications={notifications} />
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => React.useContext(NotificationContext);

export const NotificationsConsumer = NotificationContext.Consumer;
