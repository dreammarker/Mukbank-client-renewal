import React from 'react';

import {Chip} from 'react-native-paper';

import styles from './ChipListStyles';

interface ChipListProps {
  list: object;
}

function ChipList({list}: ChipListProps) {
  return (
    <>
      <Chip style={styles.chips as any} height={35} textStyle={{fontSize: 16}}>
        {list.name}
      </Chip>
    </>
  );
}
export default ChipList;
