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

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';

import Home from './Screen/Home/Home';
import SearchScreen from './Screen/Main/Screen/Search/SearchScreen';
import SearchListScreen from './Screen/Main/Screen/SearchList/SearchListScreen';
import DetailScreen from './Screen/Main/Screen/Detail/DetailScreen';
import LoadNaviScreen from './Screen/Main/Screen/LoadNavi/LoadNaviScreen';

const Stack = createStackNavigator();

interface AppProps {
  Location: {
    latitude: number;
    longitude: number;
  };
  // 36.9919666, 127.5896299
}

function App({Location}: AppProps) {
  const [location, setLocation] = useState(Location);

  const GetCurrentLocation = () => {
    // 현재위치 표시
    Geolocation.getCurrentPosition((locationInfo) => {
      setLocation({
        latitude: locationInfo.coords.latitude,
        longitude: locationInfo.coords.longitude,
      });
    });
  };

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // 위에 바 없애줌
        }}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="Search">
          {(props) => <SearchScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SearchList">
          {(props) => <SearchListScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="LoadNavi" component={LoadNaviScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
