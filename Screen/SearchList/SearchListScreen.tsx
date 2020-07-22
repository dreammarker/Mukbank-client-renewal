/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Avatar} from 'react-native-paper';
import {Grid, Col} from 'react-native-easy-grid';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

import {ListData} from './Components/ListData';
import ListBox from './Components/ListBox';

type random = {
  id: number;
  name: string;
  kind: string;
  distance: string;
  address: string;
};

function SearchListScreen() {
  const [randomData] = useState<random>({
    id: 123456,
    name: '에비씨맛집',
    kind: '한식',
    distance: '0.12',
    address: '서울특별시 강남구 삼성동 168 23번지 4층',
  });
  const [listDatas] = useState<object>(ListData);

  return (
    <ScrollView>
      <View>
        <Text>오늘의 추천</Text>
      </View>
      <View>
        <ListBox list={randomData} />
      </View>
      <Text>검색 결과</Text>
      {/* <View>
        {listDatas.map((item: object) => (
          <View key={JSON.stringify(item)}>
            <ListBox list={item} />
          </View>
        ))}
      </View> */}
    </ScrollView>
  );
}

export default SearchListScreen;
