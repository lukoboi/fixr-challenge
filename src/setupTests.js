import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { NotificationContextProvider } from './context/NotificationContext';

// used to have access to the context
const WrappingProviders = ({ children }) => {
  return <NotificationContextProvider>{children}</NotificationContextProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: WrappingProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
