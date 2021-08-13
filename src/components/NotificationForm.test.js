import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { NotificationForm } from './NotificationForm';

describe('when <NotificationForm /> renders', () => {
  describe('and no message is entered', () => {
    it('should disable the notify button', () => {
      render(<NotificationForm />);
      expect(screen.getByText('Notify')).toBeDisabled();
    });
  });

  describe('and a message is entered', () => {
    it('should enable the notify button', () => {
      render(<NotificationForm />);

      userEvent.type(
        screen.getByPlaceholderText(/message/i),
        'message content'
      );

      expect(screen.getByText('Notify')).toBeEnabled();
    });
  });
});

// given more time add more testing to this
