import React, {useEffect} from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import {Searchbar} from 'react-native-paper';

import styles from './MapScreenStyle';

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;

interface Props {
  location: {
    latitude: number; // 36.9919666
    longitude: number; // 127.5896299
  };
  navigation: Navigation;
  getUserInfo: () => Promise<void>;
  GetCurrentLocation: () => void;
  isLogin: boolean;
}

function MapScreen({
  location,
  navigation,
  getUserInfo,
  GetCurrentLocation,
  isLogin,
}: Props) {
  useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, [isLogin]);
  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map as any}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
        />
      ) : (
        <></>
      )}
      <Searchbar
        style={styles.searchBar as any}
        icon="menu"
        placeholder="검색"
        onIconPress={() => navigation.openDrawer()}
        onFocus={() => navigation.navigate('Search')}
      />
    </View>
  );
}

export default MapScreen;
