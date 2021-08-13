export interface Notification {
  /**
   * Unique id for each notification
   */
  id: string;
  /**
   * Message to display on the Notification
   */
  message: string;
  /**
   * Optional configuration
   */
  options?: NotificationOptions;
}

export enum NotificationCategory {
  SUCCESS,
  INFO,
  WARNING,
}

export interface NotificationOptions {
  /**
   * Category of notification
   */
  category?: NotificationCategory;
  /**
   * Duration before being dismissed in seconds
   */
  duration?: number;
}

export enum ButtonType {
  PRIMARY,
  SECONDARY,
}
