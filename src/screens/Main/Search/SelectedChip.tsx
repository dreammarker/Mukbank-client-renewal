import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

interface Prop {
  list: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  setCanceledChip: React.Dispatch<React.SetStateAction<string>>;
}

function SelectedChip({list, select, setSelect, setCanceledChip}: Prop) {
  function CancelChip(e: string) {
    // 선택된 칩 선택하면 select에서 빠지고 chip을 false로 변경해야 함
    const findChip: number = select.indexOf(e);
    setCanceledChip(select[findChip]);
    select.splice(findChip, 1);
    setSelect([...select]);
  }

  return (
    <>
      <Chip
        style={styles.selectedChip as any}
        mode="outlined"
        onClose={() => CancelChip(list)}
        onPress={() => CancelChip(list)}>
        {list}
      </Chip>
    </>
  );
}
export default SelectedChip;

const styles = StyleSheet.create({
  selectedChip: {
    margin: 4,
  },
});
