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
import SplashScreen from 'react-native-splash-screen';

import Home from './src/screens/Home/Home';
import SearchScreen from './src/screens/Main/Search/SearchScreen';
import SearchListScreen from './src/screens/Main/SearchList/SearchListScreen';
import LikeListScreen from './src/screens/Main/LikeList/LikeListScreen';
import DetailScreen from './src/screens/Main/Detail/DetailScreen';
import LoadNaviScreen from './src/screens/Main/LoadNavi/LoadNaviScreen';
import LoginScreen from './src/screens/Main/Login/LoginScreen';
import SignUpScreen from './src/screens/Main/SignUp/SignUpScreen';
import Config from 'react-native-config';

import {UserInfo, Location} from './src/types';

const Stack = createStackNavigator();

interface Props {
  userLocation: Location;
}

function App({userLocation}: Props) {
  axios.defaults.baseURL = Config.base_URL;

  const [location, setLocation] = useState(userLocation);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    nickname: '',
    joined: '',
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);

  function GetCurrentLocation() {
    // 현재위치 표시
    return Geolocation.getCurrentPosition(
      (locationInfo) => {
        setLocation({
          latitude: locationInfo.coords.latitude,
          longitude: locationInfo.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 50000,
        maximumAge: 10000,
      },
    );
  }

  const getUserInfo = async () => {
    try {
      const cookie = await AsyncStorage.getItem('userData');
      if (cookie !== null) {
        // AsyncStorage에 토큰 남아있으면
        const response = await axios
          .get('user/usertokenCheck', {
            withCredentials: true,
          })
          .then((res) => res.data)
          .catch((error) => console.error(error));

        if (response.token) {
          setIsLogin(true);
          let createAtData: string = response.data.createdAt;
          const findIndex: number = createAtData.indexOf('T');
          createAtData = createAtData.slice(0, findIndex);
          setUserInfo({
            id: response.data.identity,
            nickname: response.data.nick,
            joined: createAtData,
          });
        }
      } else if (cookie === null) {
        //안남아있으면
        setIsLogin(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

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
                  setIsLogin={setIsLogin}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {(props) => (
                <SearchScreen
                  {...props}
                  location={location}
                  GetCurrentLocation={GetCurrentLocation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SearchList">
              {(props) => (
                <SearchListScreen
                  {...props}
                  GetCurrentLocation={GetCurrentLocation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="LikeList" component={LikeListScreen} />
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
