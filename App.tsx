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
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import Home from './src/screens/Home/Home';
import SearchScreen from './src/screens/Main/Search/SearchScreen';
import SearchListScreen from './src/screens/Main/SearchList/SearchListScreen';
import DetailScreen from './src/screens/Main/Detail/DetailScreen';
import LoadNaviScreen from './src/screens/Main/LoadNavi/LoadNaviScreen';
import LoginScreen from './src/screens/Main/Login/LoginScreen';
import SignUpScreen from './src/screens/Main/SignUp/SignUpScreen';

const Stack = createStackNavigator();

type UserInfo = {
  id: string;
  nickname: string;
};

interface Props {
  Location: {latitude: number; longitude: number};
}

function App({Location}: Props) {
  const [location, setLocation] = useState(Location);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    nickname: '',
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);

  function GetCurrentLocation() {
    // 현재위치 표시
    return Geolocation.getCurrentPosition((locationInfo) => {
      setLocation({
        latitude: locationInfo.coords.latitude,
        longitude: locationInfo.coords.longitude,
      });
    });
  }

  const getUserInfo = async () => {
    try {
      const cookie = await AsyncStorage.getItem('userData');
      if (cookie !== null) {
        // AsyncStorage에 토큰 남아있으면
        const token = await JSON.parse(cookie);
        const response = await axios
          .get('http://172.30.1.52:5001/user/usertokenCheck', {
            headers: {userToken: `${token}`},
          })
          .then((res) => res.data)
          .catch((error) => console.error(error));

        if (response.token) {
          setUserInfo({
            id: response.data.identity,
            nickname: response.data.nick,
          });
        }
      } else if (cookie === null) {
        //안남아있으면
        setUserInfo({id: '', nickname: ''});
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  useEffect(() => {
    getUserInfo();
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
              {(props) => (
                <Home
                  {...props}
                  location={location}
                  userInfo={userInfo}
                  getUserInfo={getUserInfo}
                  GetCurrentLocation={GetCurrentLocation}
                  isLogin={isLogin}
                  setUserInfo={setUserInfo}
                  setIsLogin={setIsLogin}
                />
              )}
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
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLogin={setIsLogin} />}
            </Stack.Screen>

            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
