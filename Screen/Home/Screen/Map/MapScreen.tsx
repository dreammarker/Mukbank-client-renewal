import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import MapView from 'react-native-maps';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import {View} from 'react-native';

import styles from './MapScreenStyle';

type NavigationProp = StackNavigationProp<HomeStackNaviParamList, 'Search'>;

type Location = {
  latitude: number; // 36.9919666
  longitude: number; // 127.5896299
};

interface MapProps {
  navigation: NavigationProp;
  MapSeacrhBar: any;
}

function MapScreen({navigation, MapSeacrhBar}: MapProps) {
  console.log(MapSeacrhBar);
  const [location, setLocation] = useState<Location | undefined>(undefined);

  const GetCurrentLocation = () => {
    // 현재위치 표시
    Geolocation.getCurrentPosition((locationInfo) => {
      setLocation({
        latitude: locationInfo.coords.latitude,
        longitude: locationInfo.coords.longitude,
      });
    });
  };

  useEffect(() => {
    GetCurrentLocation();
  }, []);

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
        onIconPress={() => MapSeacrhBar()}
        onFocus={() => navigation.navigate('Search')}
      />
    </View>
  );
}

export default MapScreen;
