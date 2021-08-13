import React from 'react';
import { useSpring, animated } from 'react-spring';

import { Notification, NotificationCategory } from '../types';
import { ReactComponent as CrossIcon } from '../icons/cross-icon.svg';
import { ReactComponent as InfoIcon } from '../icons/info-icon.svg';
import { ReactComponent as TickIcon } from '../icons/tick-icon.svg';
import { ReactComponent as WarningIcon } from '../icons/warning-icon.svg';

interface NotificationToastProps {
  /**
   * Notification to display
   */
  notification: Notification;
  /**
   * Called to remove a notification
   */
  removeNotification: () => void;
}

export const NotificationToast = ({
  notification,
  removeNotification,
}: NotificationToastProps) => {
  const { message, options } = notification;

  const [startProgress, setStartProgress] = React.useState(false);
  const [pause, setPause] = React.useState(false);
  const [isFadingOut, setIsFadingOut] = React.useState(false);

  // updates style to fade out and then removes
  const remove = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      removeNotification();
    }, 300);
  };

  // used to animate progress
  const styles = useSpring({
    width: pause || !startProgress ? '0%' : '100%',
    config: { duration: pause ? 0 : (options?.duration || 1) * 1000 },
  });

  const timeout = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!options?.duration) return;

    // reset remove timeout when pausing
    if (pause) {
      timeout.current && clearTimeout(timeout.current);
      return;
    }

    // start timeout until removing
    setStartProgress(true);
    timeout.current = window.setTimeout(() => {
      remove();
    }, options.duration * 1000);

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [pause]);

  // compute correct styles/icon
  let categoryStyles: {
    primaryColor: string;
    secondaryColor: string;
    icon: JSX.Element;
  };

  switch (options?.category) {
    case NotificationCategory.INFO: {
      categoryStyles = {
        primaryColor: 'bg-fixr-blue',
        secondaryColor: 'bg-fixr-blue-dark',
        icon: <InfoIcon data-testid="NotificationToast-infoIcon" />,
      };
      break;
    }
    case NotificationCategory.WARNING: {
      categoryStyles = {
        primaryColor: 'bg-fixr-red',
        secondaryColor: 'bg-fixr-red-dark',
        icon: (
          <WarningIcon
            className="flash"
            data-testid="NotificationToast-warningIcon"
          />
        ),
      };
      break;
    }
    case NotificationCategory.SUCCESS:
    default: {
      categoryStyles = {
        primaryColor: 'bg-fixr-green',
        secondaryColor: 'bg-fixr-green-dark',
        icon: <TickIcon data-testid="NotificationToast-successIcon" />,
      };
    }
  }

  return (
    <div className="flex justify-end">
      <div
        className={`${categoryStyles.primaryColor} ${
          isFadingOut ? 'fadeout' : 'fadein'
        }  relative rounded text-white font-semibold tracking-wide hover:bg-opacity-90 transition-all duration-200 cursor-pointer`}
        style={{ minWidth: 250 }}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        onClick={() => remove()}
        data-testid="NotificationToast"
      >
        <main className="flex justify-between px-4 py-5">
          <animated.div
            data-testid="NotificationToast-progress"
            style={styles}
            className={`${categoryStyles.secondaryColor} absolute h-full rounded left-0 top-0`}
          />

          <div className="z-10 flex items-center justify-between w-full space-x-2">
            <section className="flex items-center space-x-3">
              <div className="w-6">{categoryStyles.icon}</div>
              <span>{message}</span>
            </section>

            <div className="w-6">
              <CrossIcon />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
