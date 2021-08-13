import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('when <Header /> renders', () => {
  it('should display the logo', () => {
    render(<Header />);
    expect(screen.getByTestId('Header-logo')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Organiser');
  });
});
