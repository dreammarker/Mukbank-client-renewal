/* eslint-disable react-native/no-inline-styles */
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
  route: {params: {sendText: string}};
}

function SearchListScreen({
  navigation,
  location,
  route,
}: SearchListScreenProps) {
  const [searchListData, setSearchListData] = useState<
    SearchListData[] | undefined
  >();
  const [isRefreshingPost, setIsRefreshingPost] = useState<boolean>(false); // 새로 고침 확인
  const [count, setCount] = useState<number>(1); // paging 숫자
  // const [randomListData, setRandomListD킨ata] = useState<SearchListData>();
  async function sendSearchFilterText(page: number) {
    try {
      const sendFilter = await axios
        .post('http://192.168.0.4:5001/restaurant/search', {
          latitude: 37.570652,
          longitude: 127.007307,
          searchText: '네네치킨',
          paging: page,
        })
        .then((res) => res.data);
      if (page > 1) {
        // count가 1 이상이면 배열 뒤에 붙이기
        setSearchListData(searchListData.concat(sendFilter));
      } else {
        // count: 1 이면 그대로 넣기
        setSearchListData(sendFilter);
      }

      if (isRefreshingPost) {
        // 위로 새로고침 한다면
        setIsRefreshingPost(false);
        setSearchListData(sendFilter);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // 검색한 텍스트 서버에서 가지고오기
    sendSearchFilterText(count);
  }, []);

  // async function sendSearchFilterText() {
  //   if (Array.isArray(route.params.sendText)) {
  //     // filter를 통해 검색을 했으면
  //     const text: string = route.params.sendText.join(', ');
  //     try {
  //       const sendFilter = await axios
  //         .post('http://192.168.0.4:5001/restaurant/selectFilter', {
  //           latitude: 37.570652,
  //           longitude: 127.007307,
  //           filterText: text,
  //         })
  //         .then((res) => res.data);
  //       setSearchListData(...searchListData ,sendFilter);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     // searchBar를 통해 검색을 했으면
  //     const text: string = route.params.sendText.trim();
  //     try {
  //       const sendSearch = await axios
  //         .post('http://192.168.0.4:5001/restaurant/search', {
  //           latitude: 37.570652,
  //           longitude: 127.007307,
  //           filterText: text,
  //         })
  //         .then((res) => res.data);
  //       setSearchListData(sendSearch);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // function resetRandomData(max: number, min: number, list: any) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   const par: any = Math.floor(Math.random() * (max - min)) + min;
  //   setRandomListData(list[par]);
  // }

  // async function sendSearchFilterText() {
  //   if (Array.isArray(route.params.sendText)) {
  //     // filter를 통해 검색을 했으면
  //     const text: string = route.params.sendText.join(', ');
  //     try {
  //       const sendFilter = await axios
  //         .post('http://192.168.0.4:5001/restaurant/selectFilter', {
  //           latitude: 37.570652,
  //           longitude: 127.007307,
  //           filterText: text,
  //         })
  //         .then((res) => res.data);
  //       setSearchListData(sendFilter);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     // searchBar를 통해 검색을 했으면
  //     const text: string = route.params.sendText.trim();
  //     try {
  //       const sendSearch = await axios
  //         .post('http://192.168.0.4:5001/restaurant/search', {
  //           latitude: 37.570652,
  //           longitude: 127.007307,
  //           filterText: text,
  //         })
  //         .then((res) => res.data);
  //       setSearchListData(sendSearch);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   // 검색한 텍스트 서버에서 가지고오기
  //   sendSearchFilterText();
  // }, []);

  // useEffect(() => {
  //   // 맨 처음 랜덤리스트 가지고 오기
  //   resetRandomData(searchListData.length - 1, 0, searchListData);
  // }, [searchListData[0]]);

  const renderItem = ({item}) => (
    // 랜더 될 스크린
    <View style={{height: 150}}>
      <ResultList item={item} />
    </View>
  );

  const ListFooterComponent = () => (
    // 끝까지 스크롤 할 때 로딩중 애니메이션 표시
    <View>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );

  const onEndReached = () => {
    setCount(count + 1);
    sendSearchFilterText(count);
  };

  const onRefresh = () => {
    // 위로 스크롤 해 새로고침 시 IsRefreshingPost true로 count를 1로, searchListData를 빈 배열로 초기화 하고 sendSearchFilterText실행
    setIsRefreshingPost(true);
    setCount(1);
    setSearchListData([]);
    sendSearchFilterText(count);
  };

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
          refreshing={isRefreshingPost}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

export default SearchListScreen;
