import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer/CustomDrawerContent';
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
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({
  location,
  userInfo,
  getUserInfo,
  GetCurrentLocation,
  isLogin,
  setUserInfo,
  setIsLogin,
}: Props) {
  return (
    <Drawer.Navigator
      initialRouteName="Map"
      drawerContent={(prop) => (
        <CustomDrawerContent
          {...prop}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
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
      <Drawer.Screen name="UserInfo" component={UserInfoScreen} />
    </Drawer.Navigator>
  );
}

export default Home;
