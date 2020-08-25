import React, {useState} from 'react';
import {Chip, Button} from 'react-native-paper';
import {View, ScrollView} from 'react-native';

import styles from './SelectFilterStyles';
import ChipList from './Components/ChipList';
import {ChipListData} from './Components/ChipListData';

function SelectFilter() {
  const [chipListData] = useState<Array<object>>(ChipListData);
  const [select, setSelect] = useState<string>('');
  console.log(select);

  return (
    <View>
      <View style={styles.selectedChipView as any}>
        <ScrollView horizontal={true}>
          <Chip mode="outlined">한식</Chip>
        </ScrollView>
        <Button>검색</Button>
      </View>
      <View style={styles.selectedChipView as any}>
        {chipListData.map((list: object) => (
          <View key={JSON.stringify(list)}>
            <ChipList list={list} select={select} setSelect={setSelect} />
          </View>
        ))}
      </View>
    </View>
  );
}
export default SelectFilter;
