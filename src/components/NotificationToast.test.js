import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { NotificationCategory } from '../types';
import { NotificationToast } from './NotificationToast';

const notificationNoDuration = {
  id: '123',
  message: 'notification message',
};

const notificationWithDuration = {
  ...notificationNoDuration,
  options: {
    duration: 500,
  },
};

describe('when <NotificationToast /> renders', () => {
  describe('and just a message is provided', () => {
    it('should display the correct message', () => {
      render(
        <NotificationToast
          notification={notificationNoDuration}
          removeNotification={() => {}}
        />
      );

      expect(
        screen.getByText(notificationNoDuration.message)
      ).toBeInTheDocument();
    });

    it('should default to Success category', () => {
      render(
        <NotificationToast
          notification={notificationNoDuration}
          removeNotification={() => {}}
        />
      );

      expect(
        screen.getByTestId('NotificationToast-successIcon')
      ).toBeInTheDocument();
      expect(screen.getByTestId('NotificationToast')).toHaveClass(
        'bg-fixr-green'
      );
    });

    it('should not show a progress bar', () => {
      render(
        <NotificationToast
          notification={notificationNoDuration}
          removeNotification={() => {}}
        />
      );

      expect(screen.getByTestId('NotificationToast-progress')).toHaveStyle(
        'width: 0%'
      );
    });
  });

  describe('and a duration is provided', () => {
    it('should display a progress bar', async () => {
      render(
        <NotificationToast
          notification={notificationWithDuration}
          removeNotification={() => {}}
        />
      );

      setTimeout(() => {
        expect(
          parseInt(
            screen
              .getByTestId('NotificationToast-progress')
              .style.width.replace('%', '')
          )
        ).toBeGreaterThanOrEqual(1);
      }, 200);
    });

    it('should call removeNotification after the duration', () => {
      const remove = jest.fn();

      render(
        <NotificationToast
          notification={notificationWithDuration}
          removeNotification={remove}
        />
      );

      setTimeout(() => {
        expect(remove).toBeCalled();
      }, notificationWithDuration.options.duration + 500);
    });

    it('should not call removeNotification when mouse enters and stop progress', () => {
      const remove = jest.fn();

      render(
        <NotificationToast
          notification={notificationWithDuration}
          removeNotification={remove}
        />
      );

      userEvent.hover(screen.getByTestId('NotificationToast'));

      setTimeout(() => {
        expect(remove).not().toBeCalled();
        expect(
          parseInt(
            screen
              .getByTestId('NotificationToast-progress')
              .style.width.replace('%', '')
          )
        ).toBeGreaterThanOrEqual(0);
      }, notificationWithDuration.options.duration * 2);
    });
  });

  describe('and it has the category Warning', () => {
    it('should be of type Warning', () => {
      render(
        <NotificationToast
          notification={{
            ...notificationNoDuration,
            options: { category: NotificationCategory.WARNING },
          }}
          removeNotification={() => {}}
        />
      );

      expect(
        screen.getByTestId('NotificationToast-warningIcon')
      ).toBeInTheDocument();
      expect(screen.getByTestId('NotificationToast')).toHaveClass(
        'bg-fixr-red'
      );
    });
  });

  describe('and it has the category Info', () => {
    it('should be of type Info', () => {
      render(
        <NotificationToast
          notification={{
            ...notificationNoDuration,
            options: { category: NotificationCategory.INFO },
          }}
          removeNotification={() => {}}
        />
      );

      expect(
        screen.getByTestId('NotificationToast-infoIcon')
      ).toBeInTheDocument();
      expect(screen.getByTestId('NotificationToast')).toHaveClass(
        'bg-fixr-blue'
      );
    });
  });
});
