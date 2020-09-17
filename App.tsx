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

import Home from './src/screens/Home/Home';
import SearchScreen from './src/screens/Main/Search/SearchScreen';
import SearchListScreen from './src/screens/Main/SearchList/SearchListScreen';
import DetailScreen from './src/screens/Main/Detail/DetailScreen';
import LoadNaviScreen from './src/screens/Main/LoadNavi/LoadNaviScreen';

const Stack = createStackNavigator();

interface AppProps {
  Location: {latitude: number; longitude: number};
}

function App({Location}: AppProps) {
  const [location, setLocation] = useState(Location);

  function GetCurrentLocation() {
    // 현재위치 표시
    return Geolocation.getCurrentPosition((locationInfo) => {
      setLocation({
        latitude: locationInfo.coords.latitude,
        longitude: locationInfo.coords.longitude,
      });
    });
  }

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  return (
    <>
      {location ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // 위에 바 없애줌
            }}>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} location={location} />}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {(props) => <SearchScreen {...props} location={location} />}
            </Stack.Screen>
            <Stack.Screen name="SearchList">
              {(props) => (
                <SearchListScreen
                  {...props}
                  GetCurrentLocation={GetCurrentLocation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Detail">
              {(props) => (
                <DetailScreen
                  {...props}
                  GetCurrentLocation={GetCurrentLocation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="LoadNavi">
              {(props) => (
                <LoadNaviScreen
                  {...props}
                  GetCurrentLocation={GetCurrentLocation}
                  location={location}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
