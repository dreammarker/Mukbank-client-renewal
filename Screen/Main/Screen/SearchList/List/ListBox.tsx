/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Linking,
} from 'react-native';
import {List, Button, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './listStyles';

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

function ListBox({list}: SearchListData) {
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
        onPress={
          () => console.log('goToDetail')
          // navigation.navigate('Detail', {
          //   id: list.id,
          // })
        }>
        <View style={styles.imageView}>
          {list.image === null ? (
            <Avatar.Image
              size={90}
              style={styles.avatar}
              source={require('./BAB.jpg')}
            />
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
                onPress={() => console.log('길찾기')}>
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
