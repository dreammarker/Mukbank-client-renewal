import React from 'react';
import {Image} from 'react-native';
import {Chip} from 'react-native-paper';

import FoodCategory from './FoodCategory';
import styles from './ChipListStyles';

interface ChipListProps {
  list: {name: string; isSelected: boolean};
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
}

function ChipList({list, select, setSelect}: ChipListProps) {
  function SelectChip(e: string) {
    // 밑의 칩 종류 선택 시 서버에 보내 줄 text 추가
    if (list.isSelected) {
      // 이미 선택 되어있는 chip이라면 취소하기
      const findChip: number = select.indexOf(e);
      select.splice(findChip, 1);
      setSelect([...select]);
      list.isSelected = false;
    } else if (list.isSelected === false) {
      // 선택 안해놓은 chip이라면 select에 추가
      setSelect([...select, e]);
      list.isSelected = true;
    }
  }

  return (
    <>
      <Chip
        avatar={<Image source={FoodCategory[list.name]} />}
        style={styles.filterchips as any}
        mode="outlined"
        onPress={() => SelectChip(list.name)}>
        {list.name}
      </Chip>
    </>
  );
}
export default ChipList;
