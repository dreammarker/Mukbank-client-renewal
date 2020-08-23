import React, {useState} from 'react';
import {Searchbar, Chip} from 'react-native-paper';
import {View, Button, ScrollView} from 'react-native';

import styles from './SearchScreenStyle';
import {ChipListData} from './Components/FoodChips/ChipListData';
import FoodChipList from './Components/FoodChips/ChipList';

function SearchScreen({navigation}: any) {
  const [chipListData] = useState<Array<object>>(ChipListData);

  return (
    <View style={styles.container as any}>
      <Searchbar
        icon="chevron-left"
        style={styles.searchBar as any}
        placeholder="검색"
        onIconPress={() => navigation.goBack()}
      />
      {/* ------------------------------------------------------------  */}
      <View style={styles.filterView}>
        <View style={styles.selectedChipView}>
          <ScrollView horizontal={true}>
            <Chip mode="outlined">한식</Chip>
            <Chip mode="outlined">일식</Chip>
            <Chip mode="outlined">퓨전음식</Chip>
            <Chip mode="outlined">머시기</Chip>
            <Chip mode="outlined">아시아음식</Chip>
            <Chip mode="outlined">아시아음식</Chip>
            <Chip mode="outlined">아시아음식</Chip>
            <Chip mode="outlined">아시아음식</Chip>
          </ScrollView>
          <Button title="검색" />
        </View>
        <View style={styles.chipView as any}>
          {chipListData.map((item: object) => (
            <View key={JSON.stringify(item)}>
              <FoodChipList list={item} navigation={navigation} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default SearchScreen;
