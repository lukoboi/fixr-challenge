import { useNotifications } from '../context/NotificationContext';
import { Notification } from '../types';
import { NotificationToast } from './NotificationToast';

interface NotificationListProps {
  /**
   * Takes a list of Notifications to display
   */
  notifications?: Notification[];
}

export const NotificationList = ({
  notifications = [],
}: NotificationListProps) => {
  const { clearNotifications } = useNotifications();

  return (
    <div className="flex flex-col space-y-6">
      {notifications?.map((notification) => {
        return (
          <NotificationToast
            key={notification.id}
            notification={notification}
            removeNotification={() => clearNotifications(notification.id)}
          />
        );
      })}
    </div>
  );
};
