import { ReactComponent as Logo } from '../icons/logo.svg';

export const Header = () => {
  return (
    <header className="flex items-center w-full px-8 py-5 space-x-4 bg-fixr-grey">
      <Logo data-testid="Header-logo" />
      <h1 className="text-white uppercase">Organiser</h1>
    </header>
  );
};
