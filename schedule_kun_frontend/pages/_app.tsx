import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SSRProvider } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </>
  );
}
