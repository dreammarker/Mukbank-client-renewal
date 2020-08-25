import React, {useState} from 'react';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {Searchbar} from 'react-native-paper';
import {View} from 'react-native';
import SelectFilter from './Components/SelectFilter/SelectFilter';
import styles from './SearchScreenStyle';

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface SearchScreenProps {
  navigation: NavigationProp;
  location: {latitude: number; longitude: number};
}

function SearchScreen({navigation, location}: SearchScreenProps) {
  const [text, setText] = useState<String>('');

  const sendText: any = () => {
    // 서치 했을 때 axios
    axios
      .post(
        'http://192.168.0.4:5001/restaurant/search',
        JSON.stringify({
          latitude: location.latitude, // 37.570652,
          longitude: location.longitude, // 127.007307,
          searchText: text,
        }),
      )
      .catch((error) => console.log(error));
    navigation.navigate('SearchList');
  };

  return (
    <View style={styles.container as any}>
      <Searchbar
        icon="chevron-left"
        style={styles.searchBar as any}
        placeholder="검색"
        onIconPress={() => navigation.goBack()}
        onChangeText={(t) => setText(t)}
        onSubmitEditing={() => sendText()}
      />

      <View style={styles.filterView}>
        {/* 필터 */}
        <SelectFilter />
      </View>
    </View>
  );
}

export default SearchScreen;
