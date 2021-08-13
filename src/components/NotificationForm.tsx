import React from 'react';

import { useNotifications } from '../context/NotificationContext';
import { ButtonType, NotificationCategory } from '../types';
import { Button } from './Button';

export const NotificationForm = () => {
  const { notify, clearNotifications } = useNotifications();

  const notificationCategories = React.useMemo(
    () =>
      Object.keys(NotificationCategory)
        .map((category) => Number.parseInt(category))
        .filter((n) => !Number.isNaN(n)),
    []
  );

  const [duration, setDuration] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [currentCategory, setCurrentCategory] =
    React.useState<NotificationCategory>(notificationCategories[0]);

  // used to cycle through each notification category
  const getNextCategory = (currentCategory: NotificationCategory) => {
    return (currentCategory + 1) % notificationCategories.length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notify(message, {
      duration: parseInt(duration),
      category: currentCategory,
    });

    setCurrentCategory((category) => getNextCategory(category));
  };

  return (
    <section className="w-full px-4 py-12 bg-white sm:px-8 md:px-32">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
        <fieldset className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="duration">
            Timeout
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.currentTarget.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Enter time"
          />
        </fieldset>

        <fieldset className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            rows={6}
            id="message"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Your message"
          />
        </fieldset>

        <hr />

        <fieldset className="flex justify-end space-x-8">
          <Button
            onClick={() => clearNotifications()}
            buttonType={ButtonType.SECONDARY}
          >
            Clear all
          </Button>
          <Button type="submit" disabled={!message}>
            Notify
          </Button>
        </fieldset>
      </form>
    </section>
  );
};
