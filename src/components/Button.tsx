import { ButtonType } from '../types';

interface ButtonProps {
  /**
   * Button Text
   */
  children: React.ReactNode;
  /**
   * Sets the type of button adjusting the colour to the appropriate type
   */
  buttonType?: ButtonType;
  /**
   * Button type, used to affect default click behavior
   */
  type?: 'submit' | 'button';
  /**
   * Optional click handler - triggered on click of button
   */
  onClick?: () => void;
  /**
   * Optionally disable the button
   */
  disabled?: boolean;
}

export const Button = ({
  children,
  buttonType = ButtonType.PRIMARY,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold py-4 rounded transition-all duration-200 hover:opacity-80 ${
        buttonType === ButtonType.PRIMARY
          ? 'uppercase text-white bg-fixr-red px-6 sm:px-20'
          : 'bg-transparent text-fixr-blue-light'
      } ${disabled && 'cursor-not-allowed opacity-80'}`}
    >
      {children}
    </button>
  );
};
