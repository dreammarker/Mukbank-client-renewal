import React, {useEffect, useState, memo} from 'react';

import axios from 'axios';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';

import {Navigation, LikeListData} from '../../../types';
import Loading from '../../components/Loading';
import NoneResult from '../../components/NoneResult';
import LikeListBox from './LikeListBox';

interface Props {
  navigation: Navigation;
  route: {params: {parent: string}};
}

function LikeListScreen({route, navigation}: Props) {
  const [list, setList] = useState<LikeListData[] | undefined>(undefined);
  const setLikeList = async () => {
    try {
      const response = await axios
        .post('http://172.30.1.7:5001/user/userrestlist', {
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
            <NoneResult text={'검색결과가 존재하지 않습니다.'} />
          ) : (
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.containerContent}>
              <View style={styles.listContainer}>
                {list.map((data: LikeListData) => (
                  <LikeListBox
                    key={JSON.stringify(data)}
                    list={data}
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
});
