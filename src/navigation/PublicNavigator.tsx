import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
// ? Screens
import { MyTheme } from "./MyTheme";
import HomeScreen from "@screens/home/HomeScreen";

const Stack = createStackNavigator();

const PublicNavigator = () => {
  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={MyTheme}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PublicNavigator;
