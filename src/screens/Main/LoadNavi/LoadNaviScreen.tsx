import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, StyleSheet} from 'react-native';
import {Polyline, Marker} from 'react-native-maps';

import Map from '../../components/Map';

interface Props {
  GetCurrentLocation: () => void;
  location: {latitude: number; longitude: number};
  route: {params: {destination: {latitude: number; longitude: number}}};
}

const MAPBOX_KEY = '';

function LoadNaviScreen({GetCurrentLocation, location, route}: Props) {
  const [direction, setDirection] = useState<object[]>();
  async function getDirection() {
    const destinationPath = await axios(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${location.longitude},${location.latitude};${route.params.destination.longitude},${route.params.destination.latitude}?geometries=geojson&access_token=${MAPBOX_KEY}`,
    ).then((res) => {
      const coord = res.data.routes[0].geometry.coordinates.map(
        (item: object[]) => {
          return {latitude: item[1], longitude: item[0]};
        },
      );
      return coord;
    });
    setDirection(destinationPath);
  }
  useEffect(() => {
    getDirection();
  }, []);

  return (
    <View style={styles.container}>
      {direction ? (
        <Map
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Polyline
            coordinates={direction}
            strokeColor="red"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={3}
          />
          <Marker
            coordinate={{
              latitude: Number(route.params.destination.latitude),
              longitude: Number(route.params.destination.longitude),
            }}
            title="목적지"
          />
        </Map>
      ) : (
        <></>
      )}
    </View>
  );
}

export default LoadNaviScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});
