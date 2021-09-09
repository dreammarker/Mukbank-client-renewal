import React, {useState, memo, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import axios from 'axios';
import {List, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import {LikeListData, Navigation} from '../../../types';
import FoodCategory from '../../components/FoodCategory';

interface Props {
  list: LikeListData;
  navigation: Navigation;
}

function LikeListBox({list, navigation}: Props) {
  const [chkLike, setChkLike] = useState<boolean>(true);

  const isFocused = useIsFocused();

  const onPressLike = async () => {
    try {
      const response = await axios
        .post(
          'user/restlikeupdate',
          {
            rest_id: list.rest_id,
          },
          {withCredentials: true},
        )
        .then((res) => res.data)
        .catch((error) => console.error(error));
      setChkLike(response.likecheck);
    } catch (error) {
      console.error(error);
    }
  };

  const getLike = async () => {
    try {
      const response = await axios
        .post(
          'user/userrestsel',
          {
            rest_id: list.rest_id,
          },
          {withCredentials: true},
        )
        .then((res) => res.data)
        .catch((error) => console.error(error));
      setChkLike(response);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isFocused === true) {
        DeviceEventEmitter.addListener('Detail', () => {
          getLike();
        });
      }
    }, []),
  );
  return (
    <List.Section>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.sectionCard}
        onPress={() => {
          navigation.navigate('Detail', {
            id: list.rest_id,
            destination: {
              latitude: list.latitude,
              longitude: list.longitude,
            },
          });
        }}>
        <View style={styles.imageView}>
          {list.image === null ? (
            list.firstchild === 'null' ? (
              <Avatar.Image
                style={styles.avatar}
                source={FoodCategory['카페']}
              />
            ) : (
              <Avatar.Image
                style={styles.avatar}
                source={FoodCategory[list.firstchild]}
              />
            )
          ) : (
            <Image
              source={{
                uri: `${list.image}`,
              }}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.detailView}>
          <View style={styles.titileIconDirection}>
            <View style={styles.titleFlex}>
              <Text style={styles.listName}>{list.name} </Text>
              <View style={styles.caDiView}>
                {list.secondchild === 'null' ? (
                  <></>
                ) : (
                  <Text style={styles.listSecondChild}>{list.secondchild}</Text>
                )}
              </View>
            </View>
            <View style={styles.IconFlex}>
              {chkLike === true ? (
                <Icon
                  name="favorite"
                  size={18}
                  color="red"
                  onPress={() => onPressLike()}
                />
              ) : (
                <Icon
                  name="favorite-border"
                  size={18}
                  color="black"
                  onPress={() => onPressLike()}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </List.Section>
  );
}

export default memo(LikeListBox);

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    height: 100,
    padding: '3%',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  detailView: {
    flex: 3,
    paddingLeft: '5%',
    position: 'relative',
  },
  titileIconDirection: {flexDirection: 'row'},
  titleFlex: {flex: 10},
  IconFlex: {flex: 1},
  listName: {fontSize: 15, marginBottom: '2%'},
  listSecondChild: {fontSize: 13},
  caDiView: {
    marginTop: '1.8%',
    marginBottom: '1.8%',
  },
});
