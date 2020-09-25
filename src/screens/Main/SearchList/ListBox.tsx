/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Linking,
  StyleSheet,
} from 'react-native';
import {List, Button, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import FoodCategory from '../../components/FoodCategory';

interface SearchListData {
  address: string;
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

interface Props {
  list: SearchListData;
  navigation: NavigationProp;
  GetCurrentLocation: any;
}

function ListBox({list, navigation, GetCurrentLocation}: Props) {
  const convertDistance = () => {
    if (list.distance >= 1) {
      return Math.ceil(list.distance * 100) / 100 + 'km';
    } else {
      return Math.ceil(list.distance * 1000) + 'm';
    }
  };

  const phoneCall = () => {
    if (list.phone === '') {
      ToastAndroid.showWithGravity(
        '번호가 존재하지 않습니다.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const phone: string = list.phone.split('-').join('');
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <List.Section>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.sectionCard}
        onPress={() => {
          navigation.navigate('Detail', {
            id: list.id,
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
                size={90}
                style={styles.avatar}
                source={FoodCategory['카페']}
              />
            ) : (
              <Avatar.Image
                size={90}
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
          <View style={styles.detailFlex}>
            <View style={styles.textFlex}>
              <Text style={styles.listName}>{list.name}</Text>
              <View style={styles.caDiView}>
                <Text style={styles.listSecondChild}>{list.secondchild}</Text>
                <Text style={{fontSize: 12.5}}>|</Text>
                <Text style={styles.listDistance}>{convertDistance()}</Text>
              </View>
              <View>
                <Text>{list.address}</Text>
              </View>
            </View>
            <View style={styles.rightIcon}>
              <Icon name="chevron-right" size={28} color="black" />
            </View>
          </View>
          <View style={styles.listBtn}>
            <View style={styles.listBtnFlex}>
              <Button
                icon="heart-outline"
                mode="text"
                color={'black'}
                onPress={() => phoneCall()}>
                좋아요
              </Button>
            </View>
            <View style={styles.listBtnFlex}>
              <Button
                icon="phone"
                mode="text"
                color={'black'}
                onPress={() => phoneCall()}>
                전화
              </Button>
            </View>
            <View style={styles.listBtnFlex}>
              <Button
                icon="map"
                mode="text"
                color={'black'}
                onPress={() =>
                  GetCurrentLocation().then(() =>
                    navigation.navigate('LoadNavi', {
                      destination: {
                        latitude: list.latitude,
                        longitude: list.longitude,
                      },
                    }),
                  )
                }>
                길찾기
              </Button>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </List.Section>
  );
}

export default ListBox;

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    height: 148,
  },
  imageView: {
    flex: 1,
    margin: '3%',
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
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  detailFlex: {
    flexDirection: 'row',
    height: '73%',
  },
  textFlex: {
    flex: 7,
  },
  listName: {fontSize: 16, marginBottom: '2%'},
  listSecondChild: {fontSize: 12.5, marginRight: '3%'},
  listDistance: {fontSize: 12.5, marginLeft: '3%'},
  caDiView: {flexDirection: 'row', marginBottom: '1.8%'},
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  listBtnFlex: {flex: 1},
  listBtn: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
  },
});
