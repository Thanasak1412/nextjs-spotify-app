import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
// css
import '../styles/globals.css';
import { themeOptions } from '../styles/themeOptions';
// components
import PlayerLayout from '../components/playerLayout';
// lib
import store from '../lib/store';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={themeOptions}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <StoreProvider store={store}>
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        </StoreProvider>
      )}
    </ChakraProvider>
  );
};

export default MyApp;
