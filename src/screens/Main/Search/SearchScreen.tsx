import React, {useState, useEffect, memo} from 'react';
import axios from 'axios';
import {Searchbar, List, ActivityIndicator} from 'react-native-paper';
import {View, ToastAndroid, StyleSheet} from 'react-native';

import {Location, Navigation} from '../../../types';
import Header from '../../components/Header';
import SelectFilter from './SelectFilter';

interface Props {
  navigation: Navigation;
  location: Location;
}

function SearchScreen({navigation, location}: Props) {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendText = () => {
    // 서치 했을 때 axios
    if (text === '') {
      // 검색어 입력한 것 없을 때
      ToastAndroid.showWithGravity(
        '검색어를 입력 해 주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      setLoading(true);
      const postText: string = text.trim();
      const postURL: string = 'search';
      axios
        .post('http://13.125.78.204:5001/restaurant/search', {
          latitude: Math.floor(location.latitude * 10000) / 10000,
          longitude: Math.floor(location.longitude * 10000) / 10000,
          text: postText,
          paging: 1,
        })
        .then((res) => res.data)
        .then((data) => {
          setLoading(false);
          navigation.navigate('SearchList', {
            sendText: postText,
            sendURL: postURL,
            data: data,
            location: location,
          });
        });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} title={'검색'} />

        <View style={styles.searchBarView}>
          <Searchbar
            style={styles.searchBar}
            placeholder="검색어를 입력해 주세요"
            onIconPress={() => sendText()}
            onChangeText={(t) => setText(t)}
            onSubmitEditing={() => sendText()}
          />
        </View>
        {/* 필터 */}
        <View style={styles.filterChipsContainer}>
          <List.Section title="선택된 필터"></List.Section>
          <SelectFilter
            navigation={navigation}
            location={location}
            setLoading={setLoading}
          />
        </View>
      </View>
      {loading === false ? (
        <></>
      ) : (
        <View style={styles.loadingView}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      )}
    </>
  );
}

export default memo(SearchScreen);

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    backgroundColor: '#fafafa',
  },
  searchBarView: {
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    top: '40%',
    marginLeft: '4%',
    marginRight: '4%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  filterChipsContainer: {
    flex: 7.5,
  },
  loadingView: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
