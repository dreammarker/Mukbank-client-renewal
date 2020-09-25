import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

interface Props {
  list: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
}

function SelectedChip({list, select, setSelect}: Props) {
  const toggleSelectChip = () => {
    const findChip: number = select.indexOf(list);
    select.splice(findChip, 1);
    setSelect([...select]);
  };

  return (
    <>
      <Chip
        style={styles.selectedChip}
        mode="outlined"
        onClose={() => toggleSelectChip()}
        onPress={() => toggleSelectChip()}>
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
