import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute='class'>
    <NextNProgress color='#ccc' />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
