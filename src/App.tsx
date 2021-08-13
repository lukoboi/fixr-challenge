import { Header } from './components/Header';
import { NotificationForm } from './components/NotificationForm';

export const App = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen overflow-x-hidden bg-fixr-grey-light">
      <Header />
      <main className="w-full max-w-5xl px-4 pb-4 mt-8 sm:mt-20">
        <h1 className="mb-6 text-xl font-semibold sm:text-3xl">
          Create a toast message
        </h1>
        <NotificationForm />
      </main>
    </div>
  );
};
