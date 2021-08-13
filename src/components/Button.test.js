import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { ButtonType } from '../types';
import { Button } from './Button';

describe('when <Button /> renders', () => {
  const message = 'button text';

  it('should show the correct text content', () => {
    render(<Button>{message}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(message);
  });

  it('should be primary and of red colour by default', () => {
    render(<Button>{message}</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-fixr-red');
  });

  describe('and the button is secondary', () => {
    it('should have blue text and no background', () => {
      render(<Button buttonType={ButtonType.SECONDARY}>{message}</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
      expect(screen.getByRole('button')).toHaveClass('text-fixr-blue-light');
    });
  });

  describe('and the button is clicked', () => {
    it('should trigger the onClick handler', () => {
      const clickHandler = jest.fn();
      render(<Button onClick={clickHandler}>{message}</Button>);

      userEvent.click(screen.getByRole('button'));
      expect(clickHandler).toBeCalledTimes(1);
    });
  });

  describe('when the button is disabled', () => {
    it('should not be clickable', () => {
      const clickHandler = jest.fn();
      render(
        <Button onClick={clickHandler} disabled>
          {message}
        </Button>
      );

      userEvent.click(screen.getByRole('button'));
      expect(clickHandler).toBeCalledTimes(0);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
