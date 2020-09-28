import React, {useEffect} from 'react';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Searchbar} from 'react-native-paper';

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
    getUserInfo();
  }, [isLogin]);
  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
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
        style={styles.searchBar}
        icon="menu"
        placeholder="검색"
        onIconPress={() => navigation.openDrawer()}
        onFocus={() => navigation.navigate('Search')}
      />
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  searchBar: {
    top: '5%',
    marginLeft: '4%',
    marginRight: '4%',
    position: 'absolute',
    backgroundColor: 'white',
  },
});
