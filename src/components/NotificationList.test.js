import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { NotificationList } from './NotificationList';

const notifications = [
  { id: '1', message: 'message 1' },
  { id: '2', message: 'message 2' },
];

describe('when <NotificationList /> renders', () => {
  describe('and a list of notifications are provided', () => {
    it('should render the notifications', () => {
      render(<NotificationList notifications={notifications} />);
      expect(screen.getAllByTestId('NotificationToast').length).toBe(
        notifications.length
      );
    });
  });

  describe('and no notifications are provided', () => {
    it('should not show any notifications', () => {
      render(<NotificationList />);
      expect(screen.queryAllByTestId('NotificationToast').length).toBe(0);
    });
  });
});
