import React, {useState, useEffect, memo} from 'react';
import axios from 'axios';
import {View, FlatList, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {Location, SearchListData, Navigation} from '../../../types';
import NoneResult from '../../components/NoneResult';
import Header from '../../components/Header';
import ListBox from './ListBox';
import RandomList from './RandomList';

interface Props {
  navigation: Navigation;
  location: Location;
  route: {
    params: {
      search: string;
      filter: string;
      data: SearchListData[];
      location: {latitude: number; longitude: number};
    };
  };
  GetCurrentLocation: () => void;
}

function SearchListScreen({navigation, route, GetCurrentLocation}: Props) {
  const [data, setData] = useState<SearchListData[]>(route.params.data); // 데이터 담을 list
  const [refreshing, setRefreshing] = useState<boolean>(false); // 위로 새로 고침 확인
  const [count, setCount] = useState<number>(1); // pagination 기능을 위한 page 숫자
  const [randomData, setRandomData] = useState<SearchListData[]>([]);
  const [moving, setMoving] = useState<boolean>(false); // 위로새로고침, paging 이벤트가 발생했는지 구분
  async function sendSearchFilterText() {
    setMoving(false);
    const latitude: number = route.params.location.latitude;
    const longitude: number = route.params.location.longitude;
    const search: string = route.params.search;
    const filter: string = route.params.filter;
    try {
      const sendPost = await axios
        .post('restaurant/restfilersearch', {
          latitude: latitude,
          longitude: longitude,
          filter: filter,
          search: search,
          paging: count,
        })
        .then((res) => res.data);

      if (refreshing) {
        // pulldown 새로고침 시
        setRefreshing(false); // 새로고침 false
        setData(sendPost);
        resetRandomData();
      } else {
        setData(data.concat(sendPost));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function resetRandomData() {
    const min = 0;
    const max = Math.floor(data.length - 1);
    const par: any = Math.floor(Math.random() * (max - min)) + min;
    setRandomData(data[par]);
  }

  useEffect(() => {
    // 맨 처음 랜덤리스트 가지고 오기
    if (data.length !== 0) {
      // 결과데이터가 있다면
      resetRandomData();
    }
  }, []);

  // ------------------------------------------- 여기서부터 FlatList Component

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

  // useEffect(() => {
  //   // if (moving === true) {
  //   // 이벤트가 발생했으면
  //   sendSearchFilterText();
  //   // }
  // }, []);

  // ---------------------------------------------------------------------
  const headerTitle = () => {
    let name: string = '';
    if (route.params.search === '' && route.params.filter === '') {
      return (name = '내 주변 맛집');
    }
    name = route.params.search + ' ' + route.params.filter;
    return name.trim();
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={`${headerTitle()} 검색 결과`} />

      {data.length === 0 ? (
        <NoneResult text={'검색결과가 존재하지 않습니다'} />
      ) : (
        <View style={styles.flatListContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => JSON.stringify(item.id)}
            ListHeaderComponent={() => (
              <RandomList
                GetCurrentLocation={GetCurrentLocation}
                randomList={randomData}
                resetRandomData={resetRandomData}
                navigation={navigation}
              />
            )}
            renderItem={({item}) => (
              <ListBox
                list={item}
                navigation={navigation}
                GetCurrentLocation={GetCurrentLocation}
              />
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={ListFooterComponent}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}
    </View>
  );
}

export default memo(SearchListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  flatListContainer: {
    marginTop: 0,
    marginLeft: '6%',
    marginRight: '6%',
    marginBottom: '6%',
  },
});
