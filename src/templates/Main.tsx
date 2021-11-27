import React, { ReactNode } from 'react';

import { AppConfig } from 'src/config';

import Header from './Header';

type IMainProps = {
  meta: ReactNode;
  center?: boolean;
};

const Main: React.FC<IMainProps> = ({ children, meta, center = false }) => {
  return (
    <>
      {meta}
      <Header />
      <main
        className={`antialiased max-h-screen lg:max-w-5xl lg:shadow-xl lg:dark:shadow-white overflow-hidden lg:my-0 lg:mx-auto md:p-8 flex-1 flex flex-col main-content align-middle overflow-y-auto border-gray-900 items-center ${
          center && 'justify-center'
        }`}
      >
        {children}
      </main>
      <footer
        className={
          'border-t border-gray-300 text-center h-8 text-sm flex justify-center items-center bg-gray-700 text-gray-300 dark:bg-gray-200 dark:text-gray-800'
        }
      >
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role='img' aria-label='Love'>
          ♥
        </span>{' '}
        by{' '}
        <a className='decoration-clone' href='https://eakzit.site'>
          {' '}
          EakzIT
        </a>
      </footer>
    </>
  );
};

export { Main };
