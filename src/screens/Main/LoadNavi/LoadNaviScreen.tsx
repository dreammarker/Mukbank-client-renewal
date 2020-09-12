import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import MapView from 'react-native-maps';

interface LoadNaviProps {
  GetCurrentLocation: any;
  location: {latitude: number; longitude: number};
  route: {params: {destination: {latitude: number; longitude: number}}};
}

const MAPBOX_KEY = '';

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
  console.log(direction);
  useEffect(() => {
    getDirection();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      }}>
      {direction ? (
        <MapView
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          // showsMyLocationButton={true}
          followsUserLocation={true}>
          <MapView.Polyline
            coordinates={direction}
            strokeColor="red"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={3}
          />
        </MapView>
      ) : (
        <></>
      )}
    </View>
  );
}

export default LoadNaviScreen;
