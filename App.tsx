/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// declare const global: {HermesInternal: null | {}};

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Screen/Home/Home';
import SearchScreen from './Screen/Main/Screen/Search/SearchScreen';
import SearchListScreen from './Screen/Main/Screen/SearchList/SearchListScreen';
import DetailScreen from './Screen/Main/Screen/Detail/DetailScreen';
import LoadNaviScreen from './Screen/Main/Screen/LoadNavi/LoadNaviScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // 위에 바 없애줌
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchList" component={SearchListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="LoadNavi" component={LoadNaviScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
