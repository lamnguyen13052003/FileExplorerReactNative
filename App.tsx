/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import Header from "./component/Header.tsx";
import HomeScreen from "./pages/HomeScreen.tsx";
import Column from "./utils/Column.tsx";
import bootstrapColors from "./utils/Colors.tsx";
import { RootState, store } from "./hooks/redux/store.config.ts";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import FolderScreen from "./pages/FolderScreen.tsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreenStackParamList, RootStackParamList } from "./types/stack.type.ts";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const InnerStack = createNativeStackNavigator<MainScreenStackParamList>();


function MainApp() {
  const theme = useSelector((state: RootState) => state.themeRedux.theme);

  bootstrapColors.setTheme(theme);

  return (
    <SafeAreaView
      style={{
        backgroundColor: bootstrapColors.light.getColor(),
        height: "100%"
      }}
    >
      <Column style={{
        height: "100%"
      }}>
        <Header />
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <InnerStack.Screen name="HomeScreen" component={HomeScreen} />
          <InnerStack.Screen name="FolderScreen" component={FolderScreen} />
        </RootStack.Navigator>
      </Column>
    </SafeAreaView>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{
          headerShown: false
        }}>
          <RootStack.Screen name="MainScreen" component={MainApp} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
