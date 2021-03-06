import React, { useState, useEffect } from 'react';

import { MoonIcon } from '@heroicons/react/outline';
import { SunIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import Switch from 'react-switch';

const ThemeSwitch: React.FC<{ className?: string }> = (props) => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const handleChange = () => {
    setTheme(theme !== 'dark' ? 'dark' : 'light');
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Switch
      onChange={handleChange}
      checked={theme === 'dark'}
      aria-label='switch between day and night themes'
      offColor='#ccf'
      onColor='#555'
      onHandleColor='#eee'
      handleDiameter={20}
      uncheckedIcon={
        <div className='flex justify-center items-center h-full'>
          <SunIcon className='text-yellow-300' />
        </div>
      }
      checkedIcon={
        <div className='flex justify-center items-center h-full'>
          <MoonIcon className='text-yellow-100' />
        </div>
      }
      height={24}
      width={48}
      {...props}
    />
  );
};

export default ThemeSwitch;
