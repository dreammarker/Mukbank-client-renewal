/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import MapScreen from './Screen/Home/Map/MapScreen';
import SearchScreen from './Screen/Search/SearchScreen';
import SearchListScreen from './Screen/SearchList/SearchListScreen';
import DetailScreen from './Screen/Detail/DetailScreen';

// declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchList" component={SearchListScreen} />
        <Stack.Screen name="DetailS" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
