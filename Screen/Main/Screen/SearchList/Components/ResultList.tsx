import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
interface SearchListData {
  adress: string;
  distance: number;
  firstchild: string;
  id: number;
  image: string | null;
  latitude: string;
  longitude: string;
  name: string;
  parent: string;
  phone: string;
  roadAddress: string;
  secondchild: string;
}

function ResultList({list}: SearchListData) {
  // const [randomListData, setRandomListData] = useState<SearchListData>();

  // function resetRandomData(max: number, min: number, list: any) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   const par: any = Math.floor(Math.random() * (max - min)) + min;
  //   setRandomListData(list[par]);
  // }

  // useEffect(() => {
  //   // 맨 처음 랜덤리스트 가지고 오기
  //   resetRandomData(searchListData.length - 1, 0, searchListData);
  // }, [searchListData[0]]);

  // -------------------------------------------------

  return (
    <View style={{height: 200}}>
      <Text>{list.name}</Text>
    </View>
  );
}

export default ResultList;
