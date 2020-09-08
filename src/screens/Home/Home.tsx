import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import MapScreen from './Map/MapScreen';
import SignScreen from './Sign/SignScreen';
import MypageScreen from './Mypage/MypageScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

interface HomeProps {
  location: {
    latitude: number;
    longitude: number;
  };
  // 36.9919666, 127.5896299
}

function Home({location}: HomeProps) {
  return (
    <Drawer.Navigator
      initialRouteName="Map"
      drawerContent={(prop) => CustomDrawerContent(prop)}>
      <Drawer.Screen name="Map">
        {(props) => <MapScreen {...props} location={location} />}
      </Drawer.Screen>

      <Drawer.Screen name="Sign" component={SignScreen} />
      <Drawer.Screen name="Mypage" component={MypageScreen} />
    </Drawer.Navigator>
  );
}

export default Home;
