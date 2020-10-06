import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';

type Props = React.ComponentProps<typeof MapView> & {
  children:
    | React.ComponentProps<typeof Marker>
    | React.ComponentProps<typeof Polyline>;
};

const Map = ({region, children, ...props}: Props) => (
  <MapView
    style={styles.map}
    region={region}
    showsUserLocation={true}
    followsUserLocation={true}
    showsMyLocationButton={false}
    {...props}>
    {children}
  </MapView>
);

export default Map;

const styles = StyleSheet.create({
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});
