import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import { isAndroid } from "@freakycoder/react-native-helpers";
/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { store, persistor } from "./src/services/redux/Store";
import { initializeReduxService } from "@services/redux/ReduxService";

import LoaderHOC from "components/loader-hoc";
import { ToastProvider } from 'react-native-toast-notifications'
import CustomToast from "components/custom-toast/Input";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  React.useLayoutEffect(() => {
    initializeReduxService(store.dispatch, store.getState);
  });
  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }
    setTimeout(async () => {
      SplashScreen.hide();
    }, 500);

  }, [scheme, isDarkMode]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider
          offsetTop={70}
          placement="top"
          renderType={{
            custom_toast: (toast) => (
              <CustomToast toast={toast} />
            )
          }}
        >
          <LoaderHOC>
            <Navigation />
          </LoaderHOC>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

