import React, {useEffect, useState} from 'react';
import {CompositeNavigationProp, useIsFocused} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet, ToastAndroid, BackHandler} from 'react-native';
import {Searchbar} from 'react-native-paper';

import Loading from '../../components/Loading';
import Map from '../../components/Map';
import CurrentLocationBtn from '../../components/CurrentLocationBtn';

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;

interface Props {
  location: {
    latitude: number;
    longitude: number;
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
  const [exitApp, SETexitApp] = useState<boolean>(false);

  const isFocused = useIsFocused();

  const backAction = () => {
    if (exitApp == false) {
      SETexitApp(true);
      ToastAndroid.showWithGravity(
        '한번 더 누르시면 종료됩니다.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (exitApp == true) {
      BackHandler.exitApp();
    }
    setTimeout(() => {
      SETexitApp(false);
    }, 2000);
    return true;
  };

  useEffect(() => {
    if (isFocused === true) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [exitApp]);

  useEffect(() => {
    getUserInfo();
  }, [isLogin]);

  return (
    <>
      {location === undefined ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Map
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
          <Searchbar
            style={styles.searchBar}
            icon="menu"
            placeholder="검색"
            onIconPress={() => navigation.openDrawer()}
            onFocus={() => navigation.navigate('Search')}
          />
          <CurrentLocationBtn GetCurrentLocation={GetCurrentLocation} />
        </View>
      )}
    </>
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
  searchBar: {
    top: '5%',
    marginLeft: '4%',
    marginRight: '4%',
    position: 'absolute',
    backgroundColor: 'white',
  },
});
