/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ListBox from './ListBox';

interface SearchListData {
  address: string;
  distance: number;
  firstchild: string;
  id: number;
  image: string | null;
  latitude: string;
  longitude: string;
  name: string;
  parent: string;
  phone: string;
  roadAddress: string;
  secondchild: string;
}

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface Props {
  navigation: NavigationProp;
  randomList: SearchListData;
  resetRandomData: any;
  GetCurrentLocation: any;
}

function RandomList({
  randomList,
  resetRandomData,
  navigation,
  GetCurrentLocation,
}: Props) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.sectionTitleView}>
            <Text style={styles.sectionTitle}>오늘의 추천</Text>
          </View>
          <View style={styles.refreshBtnView}>
            <Icon
              onPress={() => {
                resetRandomData();
              }}
              name="refresh"
              size={22}
              color="black"
            />
          </View>
        </View>

        <ListBox
          list={randomList}
          navigation={navigation}
          GetCurrentLocation={GetCurrentLocation}
        />
      </View>
      <View style={styles.subHeader}>
        <View style={styles.sectionTitleView}>
          <Text style={styles.sectionTitle}>검색 결과</Text>
        </View>
      </View>
    </>
  );
}

export default RandomList;

const styles = StyleSheet.create({
  container: {marginBottom: '5%'},
  subHeader: {
    marginBottom: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleView: {position: 'relative', height: '100%'},
  sectionTitle: {fontSize: 17.5, color: 'black'},
  refreshBtnView: {
    position: 'relative',
    height: '100%',
    width: '15%',
    alignItems: 'center',
  },
});
