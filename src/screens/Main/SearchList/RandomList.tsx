import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {SearchListData, Navigation} from '../../../types';
import ListBox from './ListBox';

interface Props {
  navigation: Navigation;
  randomList: SearchListData[];
  resetRandomData: () => void;
  GetCurrentLocation: () => void;
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

export default memo(RandomList);

const styles = StyleSheet.create({
  container: {marginTop: '5%', marginBottom: '5%'},
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
