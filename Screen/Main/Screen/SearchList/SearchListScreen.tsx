/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import styles from './SearchListScreenStyle';
import ResultList from './Components/ResultList';

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

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface SearchListScreenProps {
  navigation: NavigationProp;
  location: {latitude: number; longitude: number};
  route: {params: {sendText: string; sendURL: string}};
}

function SearchListScreen({
  navigation,
  location,
  route,
}: SearchListScreenProps) {
  const [searchListData, setSearchListData] = useState<
    SearchListData[] | undefined
  >(undefined); // 데이터 담을 list
  const [refreshing, setRefreshing] = useState<boolean>(false); // 위로 새로 고침 확인
  const [count, setCount] = useState<number>(1); // pagination 기능을 위한 page 숫자
  async function sendSearchFilterText() {
    const postText: string = route.params.sendText;
    const postURL: string = route.params.sendURL;

    try {
      const sendPost = await axios
        .post(`http://192.168.0.4:5001/restaurant/${postURL}`, {
          latitude: Math.floor(location.latitude * 10000) / 10000, // 37.570652,
          longitude: Math.floor(location.longitude * 10000) / 10000, // 127.007307,
          text: postText,
          paging: count,
        })
        .then((res) => res.data);
      if (count > 1) {
        // page가 2부터면 뒤에 array에 붙임
        setSearchListData(searchListData.concat(sendPost));
      } else {
        if (refreshing) {
          // 위로 새로고침 시
          setRefreshing(false);
        }
        setSearchListData(sendPost);
      }
    } catch (error) {
      console.log('에러 에러', error);
    }
  }

  useEffect(() => {
    // 검색한 텍스트 서버에서 가지고오기
    sendSearchFilterText();
  }, []);

  useEffect(() => {
    // count(paging)할 array가 바뀔 때 마다
    sendSearchFilterText();
  }, [count]);

  // -------------------------------------------
  const renderItem = ({item}: SearchListData) => (
    // 랜더 될 리스트 컴포넌트
    <View>
      <ResultList list={item} />
    </View>
  );

  const onEndReached = () => {
    // list가 끝까지 닿았을 때
    setCount(count + 1);
  };

  const onRefresh = () => {
    // 위로 스크롤 해 새로고침 시 refreshing true로 count를 1
    setRefreshing(true);
    setCount(1);
  };

  const ListFooterComponent = () => (
    // 끝까지 스크롤 할 때 로딩중 애니메이션 표시
    <View>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );

  return (
    <View style={styles.container}>
      {searchListData === undefined ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={searchListData}
          keyExtractor={(item) => JSON.stringify(item.id)}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooterComponent}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

export default SearchListScreen;
