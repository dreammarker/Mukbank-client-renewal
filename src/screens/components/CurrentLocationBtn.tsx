import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

type Props = {GetCurrentLocation: () => void};

const CurrentLocationBtn = ({GetCurrentLocation}: Props) => (
  <View style={styles.currentLocationView}>
    <TouchableOpacity onPress={() => GetCurrentLocation()}>
      <Image
        source={require('../../assets/gpsImg.png')}
        style={styles.currentLocationImage}
      />
    </TouchableOpacity>
  </View>
);

export default CurrentLocationBtn;

const styles = StyleSheet.create({
  currentLocationView: {
    backgroundColor: '#fafafa',
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    alignSelf: 'flex-end',
    height: 43,
    width: 43,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  currentLocationImage: {
    height: 35,
    width: 35,
  },
});
