import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, ToastAndroid} from 'react-native';

import SelectFilter from './Components/SelectFilter/SelectFilter';
import styles from './SearchScreenStyle';

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface SearchScreenProps {
  navigation: NavigationProp;
  location: {latitude: number; longitude: number};
}

function SearchScreen({navigation, location}: SearchScreenProps) {
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
      navigation.navigate('SearchList', {sendText: text});
    }
  };

  return (
    <View style={styles.container as any}>
      <View style={styles.searchBarView as any}>
        <Searchbar
          icon="chevron-left"
          style={styles.searchBar as any}
          placeholder="검색"
          onIconPress={() => navigation.goBack()}
          onChangeText={(t) => setText(t)}
          onSubmitEditing={() => sendText()}
        />
      </View>
      {/* 필터 */}
      <View style={styles.filterChipsContainer as any}>
        <SelectFilter location={location} navigation={navigation} />
      </View>
    </View>
  );
}

export default SearchScreen;
