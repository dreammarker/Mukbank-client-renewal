import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import styles from './LoadNaviStyles';

interface LoadNaviProps {
  GetCurrentLocation: any;
  location: {latitude: number; longitude: number};
  route: {params: {destination: {latitude: number; longitude: number}}};
}

const MAPBOX_KEY =
  'pk.eyJ1Ijoib2xsYWJ1MyIsImEiOiJja2V2ZmRkbm0yZmIyMnJwbmkzdnhmOWR3In0.IGDwQNEEQN2tbGH00798IA';

function LoadNaviScreen({GetCurrentLocation, location, route}: LoadNaviProps) {
  console.log(location);
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
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          // showsMyLocationButton={true}
          followsUserLocation={true}>
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
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
      ) : (
        <></>
      )}
    </View>
  );
}

export default LoadNaviScreen;
