import React, {useState} from 'react';
import axios from 'axios';
import {Searchbar, List} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, ToastAndroid, StyleSheet} from 'react-native';

import SelectFilter from './SelectFilter';

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface Props {
  navigation: NavigationProp;
  location: {latitude: number; longitude: number};
}

function SearchScreen({navigation, location}: Props) {
  const [text, setText] = useState<string>('');

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
      const postText: string = text.trim();
      const postURL: string = 'search';
      axios
        .post('http://172.30.1.52:5001/restaurant/search', {
          latitude: Math.floor(location.latitude * 10000) / 10000,
          longitude: Math.floor(location.longitude * 10000) / 10000,
          text: postText,
          paging: 1,
        })
        .then((res) => res.data)
        .then((data) =>
          navigation.navigate('SearchList', {
            sendText: postText,
            sendURL: postURL,
            data: data,
            location: location,
          }),
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarView}>
        <Searchbar
          icon="chevron-left"
          style={styles.searchBar}
          placeholder="검색"
          onIconPress={() => navigation.goBack()}
          onChangeText={(t) => setText(t)}
          onSubmitEditing={() => sendText()}
        />
      </View>
      {/* 필터 */}
      <View style={styles.filterChipsContainer}>
        <List.Section title="선택된 필터"></List.Section>
        <SelectFilter navigation={navigation} location={location} />
      </View>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
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
});
