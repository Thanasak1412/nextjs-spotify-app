import { ChakraProvider } from '@chakra-ui/react';
// css
import '../styles/globals.css';
import { themeOptions } from '../styles/themeOptions';
// components
import PlayerLayout from '../components/playerLayout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={themeOptions}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </ChakraProvider>
  );
};

export default MyApp;
