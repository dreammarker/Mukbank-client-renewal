import React from 'react';

import {Chip} from 'react-native-paper';

import styles from './ChipListStyles';

interface ChipListProps {
  list: {name: string; isSelected: boolean};
  select: string;
  setSelect: string;
}

function ChipList({list, select, setSelect}: ChipListProps) {
  function SelectChip(e: any) {
    // 밑의 칩 종류 선택 시 서버에 보내 줄 text 추가
    if (select === '') {
      setSelect(select + e);
    } else {
      if (select.indexOf(e) === -1) {
        setSelect(select + ', ' + e);
      }
    }
  }

  return (
    <>
      <Chip
        style={styles.unSelectChips as any}
        mode="outlined"
        height={35}
        textStyle={{fontSize: 16}}
        onPress={() => SelectChip(list.name)}>
        {list.name}
      </Chip>
    </>
  );
}
export default ChipList;
