import React, {useState, memo} from 'react';
import axios from 'axios';
import {Searchbar, List, ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

import {Location, Navigation} from '../../../types';
import Header from '../../components/Header';
import SelectFilter from './SelectFilter';

interface Props {
  navigation: Navigation;
  location: Location;
  GetCurrentLocation: () => void;
}

function SearchScreen({navigation, GetCurrentLocation, location}: Props) {
  const [text, setText] = useState<string>('');
  const [select, setSelect] = useState<string[]>([]); // 선택된 chip의 name들
  const [loading, setLoading] = useState<boolean>(false);

  const sendText = () => {
    setLoading(true);
    const search: string = text.trim();
    const filter: string = select.join(', ');
    GetCurrentLocation().then(() =>
      axios
        .post('restaurant/restfilersearch', {
          latitude: Math.floor(location.latitude * 10000) / 10000,
          longitude: Math.floor(location.longitude * 10000) / 10000,
          filter: filter,
          search: search,
          paging: 1,
        })
        .then((res) => {
          setLoading(false);
          navigation.navigate('SearchList', {
            search: search,
            filter: filter,
            data: res.data,
            location: location,
          });
        }),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} title={'검색'} />

        <View style={styles.searchBarView}>
          <Searchbar
            style={styles.searchBar}
            placeholder="음식점을 입력해 주세요"
            iconColor="black"
            onIconPress={() => sendText()}
            onChangeText={(t) => setText(t)}
            onSubmitEditing={() => sendText()}
          />
        </View>
        {/* 필터 */}
        <View style={styles.filterChipsContainer}>
          <List.Section
            title="선택된 필터"
            titleStyle={styles.title}></List.Section>
          <SelectFilter
            navigation={navigation}
            location={location}
            setLoading={setLoading}
            select={select}
            setSelect={setSelect}
            sendText={sendText}
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
  title: {color: 'black'},
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
