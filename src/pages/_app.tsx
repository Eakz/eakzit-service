import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import { FileContextProvider } from 'src/context/fileContext';
import '../styles/main.css';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <FileContextProvider>
    <ThemeProvider attribute='class'>
      <NextNProgress color='#ccc' />
      <Component {...pageProps} />
    </ThemeProvider>
    <ToastContainer />
  </FileContextProvider>
);

export default MyApp;
