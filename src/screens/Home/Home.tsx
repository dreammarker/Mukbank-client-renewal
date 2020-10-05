import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawer/CustomDrawerContent';
import MapScreen from './Map/MapScreen';
import SignScreen from './Sign/SignScreen';
import UserInfoScreen from './UserInfo/UserInfoScreen';

const Drawer = createDrawerNavigator();

interface Props {
  userInfo: {id: string; nickname: string};
  location: {
    latitude: number;
    longitude: number;
  };

  getUserInfo: () => Promise<void>;
  GetCurrentLocation: () => void;
  // 36.9919666, 127.5896299
  isLogin: boolean;
  setUserInfo: any;
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
