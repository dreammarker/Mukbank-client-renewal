import React, {useState} from 'react';
import axios from 'axios';
import {Button, List} from 'react-native-paper';
import {View, ScrollView, ToastAndroid, StyleSheet} from 'react-native';

import {Location, Navigation} from '../../../types';
import ChipList from './ChipList';
import SelectedChip from './SelectedChip';

export const ChipListData: string[] = [
  '카페',
  '한식',
  '일식',
  '양식',
  '남미음식',
  '치킨',
  '중식',
  '술집',
  '분식',
  '동남아음식',
  '인도음식',
  '아시아음식',
  '퓨전음식',
];

interface Props {
  navigation: Navigation;
  location: Location;
}

function SelectFilter({navigation, location}: Props) {
  const [chipListData] = useState<string[]>(ChipListData); // 기존 선택사항 chip들
  const [select, setSelect] = useState<string[]>([]); // 선택된 chip의 name들

  const sendFilterText = () => {
    if (select.length === 0) {
      // 필터 선택 한 것 없을 때
      ToastAndroid.showWithGravity(
        '필터를 선택 해 주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const postText: string = select.join(', ');
      const postURL: string = 'selectFilter';
      axios
        .post('http://13.125.78.204:5001/restaurant/selectFilter', {
          latitude: Math.floor(location.latitude * 10000) / 10000,
          longitude: Math.floor(location.longitude * 10000) / 10000,
          text: postText,
          paging: 1,
        })
        .then((res) => res.data)
        .then((data) =>
          navigation.navigate('SearchList', {
            sendText: postText,
            sendURL: postURL,
            data: data,
            location: location,
          }),
        );
    }
  };

  return (
    <>
      <View style={styles.selectedChipView}>
        <View style={styles.selectedChip}>
          <ScrollView horizontal={true}>
            {select.map((list: string) => (
              <SelectedChip
                key={JSON.stringify(list)}
                list={list}
                select={select}
                setSelect={setSelect}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.selectedChipBtnView}>
          <Button
            style={styles.selectedChipBtn}
            mode="contained"
            onPress={() => sendFilterText()}>
            검색
          </Button>
        </View>
      </View>

      <View style={styles.chipView}>
        <List.Section title="필터">
          <View style={styles.row}>
            {chipListData.map((list: string) => (
              <ChipList
                key={JSON.stringify(list)}
                list={list}
                select={select}
                setSelect={setSelect}
              />
            ))}
          </View>
        </List.Section>
      </View>
    </>
  );
}

export default SelectFilter;

const styles = StyleSheet.create({
  selectedChipView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '4%',
    marginRight: '4%',
  },
  selectedChip: {paddingRight: '2%', width: '80%'},
  selectedChipBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedChipBtn: {justifyContent: 'center'},
  chipView: {
    flex: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});
