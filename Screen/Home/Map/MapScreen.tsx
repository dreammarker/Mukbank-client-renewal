import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {View} from 'react-native';

import styles from './MapScreenStyle';

type Location = {
  latitude: number; // 36.9919666
  longitude: number; // 127.5896299
};

function MapScreen() {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  const getCurrentLocation = () => {
    // check current location
    Geolocation.getCurrentPosition(
      (LocationInfo) => {
        const {latitude, longitude} = LocationInfo.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log('Error', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000},
      // maximumAge: 15000 maximumAge를 적용하니까 자꾸 location check runtime error가 떠요
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  console.log('MapScreen');
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map as any}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          // showsUserLocation={true}
          // showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <View style={styles.radius as any}>
              <View style={styles.marker as any} />
            </View>
          </Marker>
        </MapView>
      )}
    </View>
  );
}

export default MapScreen;
