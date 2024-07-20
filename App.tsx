/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import Header from "./component/Header.tsx";
import Home from "./pages/Home.tsx";
import Column from "./utils/Column.tsx";
import bootstrapColors from "./utils/Colors.tsx";
import { RootState, store } from "./hooks/redux/store.config.ts";
import { Provider, useSelector } from "react-redux";


function MainApp() {
  const theme = useSelector((state: RootState) => state.themeRedux.theme);

  bootstrapColors.setTheme(theme);

  return (
    <SafeAreaView
      style={{
        backgroundColor: bootstrapColors.light.getColor(),
      }}
    >
      <Column>
        <Header />
        <Home
          style={{
            padding: 20,
          }}
        />
      </Column>
    </SafeAreaView>
  );
}

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
