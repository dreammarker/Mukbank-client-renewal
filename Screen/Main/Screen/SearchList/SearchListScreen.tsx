/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, FlatList, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import styles from './SearchListScreenStyle';
import ResultList from './Components/ResultList';
import RandomList from './Components/RandomList';

interface SearchListData {
  address: string;
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
  route: {
    params: {
      sendText: string;
      sendURL: string;
      data: SearchListData;
      location: {latitude: number; longitude: number};
    };
  };
}

function SearchListScreen({
  navigation,
  location,
  route,
}: SearchListScreenProps) {
  const [data, setData] = useState<SearchListData[]>(route.params.data); // 데이터 담을 list
  const [refreshing, setRefreshing] = useState<boolean>(false); // 위로 새로 고침 확인
  const [count, setCount] = useState<number>(1); // pagination 기능을 위한 page 숫자
  const [randomData, setRandomData] = useState<SearchListData[]>([]);
  const [moving, setMoving] = useState<boolean>(false); // 위로새로고침, paging 이벤트가 발생했는지 구분

  async function sendSearchFilterText() {
    setMoving(false);
    const latitude: number = route.params.location.latitude;
    const longitude: number = route.params.location.longitude;
    const postText: string = route.params.sendText;
    const postURL: string = route.params.sendURL;
    try {
      const sendPost = await axios
        .post(`http://172.30.1.52:5001/restaurant/${postURL}`, {
          latitude: latitude, // 37.570652
          longitude: longitude, // 127.007307
          text: postText,
          paging: count,
        })
        .then((res) => res.data);
      if (refreshing) {
        // pulldown 새로고침 시
        setRefreshing(false); // 새로고침 false
        setData(sendPost);
        resetRandomData(data.length - 1, 0, data);
      } else {
        setData(data.concat(sendPost));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function resetRandomData(max: number, min: number, list: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const par: any = Math.floor(Math.random() * (max - min)) + min;
    setRandomData(list[par]);
  }

  useEffect(() => {
    // 맨 처음 랜덤리스트 가지고 오기
    if (data.length !== 0) {
      // 결과데이터가 있다면
      resetRandomData(data.length - 1, 0, data);
    }
  }, []);

  // ------------------------------------------- 여기서부터 FlatList Component

  const listHeaderComponent = () => (
    // 첫 헤더에 랜덤리스트
    <RandomList randomList={randomData} resetRandomData={resetRandomData} />
  );

  const renderItem = ({item}: SearchListData) => (
    // paging 랜더 될 리스트 컴포넌트
    <View>
      <ResultList list={item} />
    </View>
  );

  const onEndReached = () => {
    // list가 bottom 끝까지 닿았을 때
    setMoving(true); // 이벤트 발생 시 true
    setCount(count + 1);
  };

  const onRefresh = () => {
    // pulldown 새로고침 시
    setMoving(true); // 이벤트 발생 시 true
    setRefreshing(true); // pulldown 새로고침인지 구분
    setCount(1);
  };

  const ListFooterComponent = () => (
    // list bottom 스크롤 할 때 loading 애니메이션 표시
    <View>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );

  useEffect(() => {
    if (moving) {
      // 이벤트가 발생했으면
      sendSearchFilterText();
    }
  }, [moving]);

  // ---------------------------------------------------------------------
  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <View style={styles.noneResult}>
          <Text style={styles.noneResultText}>검색결과가 없습니다</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => JSON.stringify(item.id)}
          ListHeaderComponent={listHeaderComponent}
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
