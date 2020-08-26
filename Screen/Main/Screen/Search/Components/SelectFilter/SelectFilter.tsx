/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import {View, ScrollView} from 'react-native';

import styles from './SelectFilterStyles';
import ChipList from './Components/ChipList';
import SelectedChip from './Components/SelectedChip';
import {ChipListData} from './Components/ChipListData';

interface ChipData {
  name: string;
  isSelected: boolean;
}

function SelectFilter() {
  const [chipListData] = useState<ChipData[]>(ChipListData); // 기존 선택사항 chip들
  const [select, setSelect] = useState<string[]>([]); // 선택된 chip의 name들
  const [canceledChip, setCanceledChip] = useState<string>(''); // SelectedChip에서 취소된 chip의 name 표시

  useEffect(() => {
    // cancelChip과 chipListData[i].name이 같다면 chipListData[i].isSelected = false
    const toggleChips = () => {
      chipListData.forEach((curr: ChipData) => {
        if (canceledChip === curr.name) {
          curr.isSelected = false;
        }
      });
    };
    toggleChips();
  }, [canceledChip]);

  return (
    <View>
      <View style={styles.selectedChipView as any}>
        <ScrollView horizontal={true}>
          {select.map((list: string) => (
            <SelectedChip
              key={JSON.stringify(list)}
              list={list}
              select={select}
              setSelect={setSelect}
              setCanceledChip={setCanceledChip}
            />
          ))}
        </ScrollView>
        <Button>검색</Button>
      </View>
      <View style={styles.selectedChipView as any}>
        {chipListData.map((list: ChipData) => (
          <View key={JSON.stringify(list)}>
            <ChipList list={list} select={select} setSelect={setSelect} />
          </View>
        ))}
      </View>
    </View>
  );
}
export default SelectFilter;
