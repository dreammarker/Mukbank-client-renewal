import React, {useEffect, useState, memo} from 'react';

import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';

import Loading from '../../components/Loading';
import NoneResult from '../../components/NoneResult';
import LikeListBox from './LikeListBox';

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;
interface Props {
  navigation: NavigationProp;
  route: {params: {parent: string}};
}

function LikeListScreen({route, navigation}: Props) {
  const [list, setList] = useState(undefined);

  const setLikeList = async () => {
    try {
      const response = await axios
        .post('http://172.30.1.33:5001/user/userrestlist', {
          parent: route.params.parent,
        })
        .then((res) => res.data)
        .catch((error) => console.error(error));

      setList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLikeList();
  }, []);
  return (
    <>
      {list === undefined ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Appbar.Header
            // 스크린 해더에 가게 명 표시
            style={styles.header}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title={`좋아요한 ${route.params.parent}`}
              style={styles.headerContent}
            />
            <Appbar.Action />
          </Appbar.Header>
          {list.length === 0 ? (
            <View style={styles.noneResult}>
              <Text style={styles.noneResultText}>
                결과가 존재하지 않습니다.
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.containerContent}>
              <View style={styles.listContainer}>
                {list.map((list: any) => (
                  <LikeListBox
                    key={JSON.stringify(list)}
                    list={list}
                    navigation={navigation}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
}

export default memo(LikeListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {backgroundColor: '#fff'},
  headerContent: {
    alignItems: 'center',
  },
  position: {justifyContent: 'center'},
  containerContent: {
    paddingTop: 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
  },
  listContainer: {
    margin: '5%',
  },
  noneResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  noneResultText: {fontSize: 15},
  flatListContainer: {
    margin: '6%',
  },
});
