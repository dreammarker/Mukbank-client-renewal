/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {Text, Button} from 'react-native';
import MapView from 'react-native-maps';

// type NavigationProp = StackNavigationProp<MainStackNaviParamList, 'Search'>;
// interface Props {
//   navigation: NavigationProp;
// }
function MapScreen() {
  console.log('MapScreen');
  return (
    <>
      <MapView style={{flex: 1}} />
    </>
  );
}

export default MapScreen;
