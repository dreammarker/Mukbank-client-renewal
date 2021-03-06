import React, {useState} from 'react';
import {Button, List} from 'react-native-paper';
import {View, ScrollView, StyleSheet} from 'react-native';

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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  sendText: () => void;
}

function SelectFilter({select, setSelect, sendText}: Props) {
  const [chipListData] = useState<string[]>(ChipListData); // 기존 선택사항 chip들

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
            onPress={() => sendText()}>
            검색
          </Button>
        </View>
      </View>

      <View style={styles.chipView}>
        <List.Section title="필터" titleStyle={styles.title}>
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
  title: {color: 'black'},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});
