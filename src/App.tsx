import Splashscreen from '@components/Splashscreen';
import '@i18n';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from '@redux/store';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import customTheme from '@theme';
import { socket, SocketContext } from '@utils/context/SocketContext';
import { NativeBaseProvider } from 'native-base';
import { Socket } from 'net';
import React, { FC, Suspense, useEffect } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { io } from 'socket.io-client';
import InnerApp from './InnerApp';

enableScreens();

const App: FC = () => {
  // useEffect(() => {
  //   const socket = io('http://10.10.21.18:3001', { transports: ['websocket'] });
  //   socket.on('connect', () => {
  //     console.log(socket.connected);
  //   });
  // }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Suspense fallback={<Splashscreen />}>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <PersistGate loading={<Splashscreen />} persistor={persistor}>
            <SafeAreaProvider>
              <NavigationContainer ref={navigationRef}>
                <NativeBaseProvider theme={customTheme}>
                  <InnerApp />
                </NativeBaseProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </SocketContext.Provider>
      </Provider>
    </Suspense>
  );
};

export default App;
