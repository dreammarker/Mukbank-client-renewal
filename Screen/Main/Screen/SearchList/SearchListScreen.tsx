/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native';

import styles from './SearchListScreenStyle';

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
/*
{ "roadAddress": "서울특별시 종로구 종로 290 동대문부대찌개&전", "secondchild": "찌개,전골"}
*/

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface SearchListScreenProps {
  navigation: NavigationProp;
  location: {latitude: number; longitude: number};
  route: {params: {sendText: string}};
}

function SearchListScreen({
  navigation,
  location,
  route,
}: SearchListScreenProps) {
  const [searchListData, setSearchListData] = useState<SearchListData[]>([]);
  const [randomListData, setRandomListData] = useState<SearchListData>();

  function resetRandomData(max: number, min: number, list: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const par: any = Math.floor(Math.random() * (max - min)) + min;
    setRandomListData(list[par]);
  }

  async function sendSearchFilterText() {
    if (Array.isArray(route.params.sendText)) {
      // filter를 통해 검색을 했으면
      const text: string = route.params.sendText.join(', ');
      try {
        const sendFilter = await axios
          .post('http://192.168.0.4:5001/restaurant/selectFilter', {
            latitude: 37.570652,
            longitude: 127.007307,
            filterText: text,
          })
          .then((res) => res.data);
        setSearchListData(sendFilter);
      } catch (error) {
        console.log(error);
      }
    } else {
      // searchBar를 통해 검색을 했으면
      const text: string = route.params.sendText.trim();
      try {
        const sendSearch = await axios
          .post('http://192.168.0.4:5001/restaurant/search', {
            latitude: 37.570652,
            longitude: 127.007307,
            filterText: text,
          })
          .then((res) => res.data);
        setSearchListData(sendSearch);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    // 검색한 텍스트 서버에서 가지고오기
    sendSearchFilterText();
  }, []);

  useEffect(() => {
    // 맨 처음 랜덤리스트 가지고 오기
    resetRandomData(searchListData.length - 1, 0, searchListData);
  }, [searchListData[0]]);

  return <ScrollView style={styles.container}></ScrollView>;
}

export default SearchListScreen;
