import React, {useState} from 'react';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {Searchbar, Chip} from 'react-native-paper';
import {View, Button, ScrollView} from 'react-native';

import styles from './SearchScreenStyle';
import {ChipListData} from './Components/FoodChips/ChipListData';
import FoodChipList from './Components/FoodChips/ChipList';

type NavigationProp = StackNavigationProp<HomeStackNaviParamList, 'SearchList'>;

interface SearchScreenProps {
  navigation: NavigationProp;
  location: {latitude: number; longitude: number};
}

function SearchScreen({navigation, location}: SearchScreenProps) {
  const [chipListData] = useState<Array<object>>(ChipListData);
  const [text, setText] = useState<String>('');

  const sendText: any = () => {
    axios
      .post(
        'http://192.168.0.4:5001/restaurant/search',
        JSON.stringify({
          latitude: location.latitude, // 37.570652,
          longitude: location.longitude, // 127.007307,
          searchText: text,
        }),
      )
      .catch((error) => console.log(error));
    navigation.navigate('SearchList');
  };

  return (
    <View style={styles.container as any}>
      <Searchbar
        icon="chevron-left"
        style={styles.searchBar as any}
        placeholder="검색"
        onIconPress={() => navigation.goBack()}
        onChangeText={(t) => setText(t)}
        onSubmitEditing={() => sendText()}
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
