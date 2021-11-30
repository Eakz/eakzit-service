import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { FileContextProvider } from 'src/context/fileContext';
import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <FileContextProvider>
    <ThemeProvider attribute='class'>
      <NextNProgress color='#ccc' />
      <Component {...pageProps} />
    </ThemeProvider>
  </FileContextProvider>
);

export default MyApp;
