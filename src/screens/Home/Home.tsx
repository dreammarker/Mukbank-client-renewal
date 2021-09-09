import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer/CustomDrawerContent';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

import MapScreen from './Map/MapScreen';
import SignScreen from './Sign/SignScreen';
import UserInfoScreen from './UserInfo/UserInfoScreen';

import {UserInfo, Location} from '../../types';

const Drawer = createDrawerNavigator();

interface Props {
  userInfo: UserInfo;
  location: Location;
  getUserInfo: () => Promise<void>;
  GetCurrentLocation: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({
  location,
  userInfo,
  getUserInfo,
  GetCurrentLocation,
  isLogin,
  setIsLogin,
}: Props) {
  const logout = async () => {
    try {
      const response = await axios
        .get('user/signout')
        .then((res) => res.data)
        .catch((error) => console.error(error));

      if (response === '로그아웃 되었습니다.') {
        await AsyncStorage.removeItem('userData');
        setIsLogin(false);
        ToastAndroid.showWithGravity(
          '로그아웃이 완료되었습니다.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Map"
      drawerContent={(prop) => (
        <CustomDrawerContent
          {...prop}
          userInfo={userInfo}
          isLogin={isLogin}
          logout={logout}
          setIsLogin={setIsLogin}
        />
      )}>
      <Drawer.Screen name="Map">
        {(props) => (
          <MapScreen
            {...props}
            location={location}
            getUserInfo={getUserInfo}
            GetCurrentLocation={GetCurrentLocation}
            isLogin={isLogin}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Sign" component={SignScreen} />
      <Drawer.Screen name="UserInfo">
        {(props) => (
          <UserInfoScreen {...props} userInfo={userInfo} logout={logout} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default Home;
