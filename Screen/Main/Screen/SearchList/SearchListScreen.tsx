import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {ListData, RandomData} from './Components/ListData';
import ListBox from './Components/ListBox';

function SearchListScreen() {
  const [randomData] = useState<object>(RandomData);
  const [listDatas] = useState<object>(ListData);
  return (
    <ScrollView>
      <View>
        <Text>오늘의 추천</Text>
        <View>
          <ListBox list={randomData[0]} />
        </View>
      </View>
      <Text>검색 결과</Text>
      <View>
        {listDatas.map((item: object) => (
          <View key={JSON.stringify(item)}>
            <ListBox list={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default SearchListScreen;
