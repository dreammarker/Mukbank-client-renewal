import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

interface LoadNaviProps {
  GetCurrentLocation: any;
  location: {latitude: number; longitude: number};
}

function LoadNaviScreen({GetCurrentLocation, location}: LoadNaviProps) {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    GetCurrentLocation();
    setCheck(true);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      }}>
      {check ? (
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
          followsUserLocation={true}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
//

export default LoadNaviScreen;
