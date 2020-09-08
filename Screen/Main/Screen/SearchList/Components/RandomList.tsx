/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './listStyles';
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

interface RandomListProps {
  randomList: SearchListData;
  resetRandomData: any;
}

function RandomList({randomList, resetRandomData}: RandomListProps) {
  return (
    <>
      <View style={{marginBottom: '5%'}}>
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
        <ListBox list={randomList} />
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
