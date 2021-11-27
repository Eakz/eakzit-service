import React from 'react';

import { LockClosedIcon, AtSymbolIcon } from '@heroicons/react/solid';

import { classNames } from 'src/helpers';
import { Meta } from 'src/layout/Meta';
import { Main } from 'src/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title='Next.js Boilerplate Presentation'
          description='Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework.'
        />
      }
    >
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div
          className='
          flex flex-col

          px-10
          sm:px-10
          md:px-15
          lg:px-20
          py-10
          rounded-3xl
          md:shadow-md
          md:dark:shadow-white
          w-50
          max-w-md
        '
        >
          <div className='font-medium self-center text-xl sm:text-3xl'>
            <h1>Welcome</h1>
          </div>
          <div className='mt-4 self-center text-xl sm:text-sm text-gray-800'>
            Enter your credentials to access your account
          </div>

          <div className='mt-10'>
            <form action='#'>
              <div className='flex flex-col mb-5'>
                <label
                  htmlFor='email'
                  className='mb-1 text-xs tracking-wide text-gray-600'
                >
                  E-Mail Address:
                </label>
                <div className='relative'>
                  <div
                    className='
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  '
                  >
                    <AtSymbolIcon
                      className={classNames(
                        'text-blue-500',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden='true'
                    />
                  </div>

                  <input
                    id='email'
                    type='email'
                    name='email'
                    className='
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border
                    border-gray-400
                    dark:border-2
                    dark:border-red-100
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  '
                    placeholder='Enter your email'
                  />
                </div>
              </div>
              <div className='flex flex-col mb-6'>
                <label
                  htmlFor='password'
                  className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'
                >
                  Password:
                </label>
                <div className='relative'>
                  <div
                    className='
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  '
                  >
                    <span>
                      <LockClosedIcon
                        className={classNames(
                          'text-blue-500',
                          'ml-2 h-5 w-5 group-hover:text-gray-500',
                        )}
                        aria-hidden='true'
                      />
                    </span>
                  </div>

                  <input
                    id='password'
                    type='password'
                    name='password'
                    className='
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  '
                    placeholder='Enter your password'
                  />
                </div>
              </div>

              <div className='flex w-full mb-6'>
                <button
                  type='submit'
                  className='
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                '
                >
                  <span className='mr-2 uppercase'>Sign In</span>
                  <span>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
