import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from './Search/SearchScreen';
import SearchListScreen from './SearchList/SearchListScreen';
import DetailScreen from './Detail/DetailScreen';
import LoadNaviScreen from './LoadNavi/LoadNaviScreen';

const Stack = createStackNavigator();

function Main() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // 위에 바 없애줌
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchList" component={SearchListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="LoadNavi" component={LoadNaviScreen} />
    </Stack.Navigator>
  );
}

export default Main;
