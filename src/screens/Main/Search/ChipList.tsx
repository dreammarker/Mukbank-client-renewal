import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

import FoodCategory from '../../components/FoodCategory';

interface Props {
  list: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
}

function ChipList({list, select, setSelect}: Props) {
  const [chk, setChk] = useState<boolean>(false);

  const toggleChip = () => {
    if (select.indexOf(list) === -1) {
      // 선택안됐으면 넣음
      setSelect([...select, list]);
      setChk(true);
    } else {
      // 칩 선택됐으면 빼고
      const findChip: number = select.indexOf(list);
      select.splice(findChip, 1);
      setSelect([...select]);
      setChk(false);
    }
  };

  useEffect(() => {
    const toggleChk = () => {
      if (select.indexOf(list) === -1) {
        setChk(false);
      } else {
        setChk(true);
      }
    };
    toggleChk();
  }, [select]);

  return (
    <>
      <Chip
        avatar={<Image source={FoodCategory[list]} />}
        style={styles.filterchips}
        mode="outlined"
        selected={chk}
        onPress={() => toggleChip()}>
        {list}
      </Chip>
    </>
  );
}
export default ChipList;

const styles = StyleSheet.create({
  filterchips: {margin: 5.5},
});
