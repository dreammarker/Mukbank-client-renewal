import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import MapScreen from './Screen/Map/MapScreen';
import SignScreen from './Screen/Sign/SignScreen';
import MypageScreen from './Screen/Mypage/MypageScreen';
import CustomDrawerContent from './CustomDrawerContent';

type TypeDrawerProp = DrawerNavigationProp<{
  Login: undefined;
  Mypage: undefined;
}>;

interface DrawerProp {
  navigation: TypeDrawerProp;
}

const MapSeacrhBar: any = ({navigation}: DrawerProp) => {
  navigation.openDrawer();
};

const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Map"
      drawerContent={(prop) => CustomDrawerContent(prop)}>
      <Drawer.Screen name="Map">
        {(props) => <MapScreen {...props} MapSeacrhBar={MapSeacrhBar} />}
      </Drawer.Screen>

      <Drawer.Screen name="Sign" component={SignScreen} />
      <Drawer.Screen name="Mypage" component={MypageScreen} />
    </Drawer.Navigator>
  );
}

export default Home;
