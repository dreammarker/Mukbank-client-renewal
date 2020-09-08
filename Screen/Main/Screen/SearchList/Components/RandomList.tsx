/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {List, Button} from 'react-native-paper';
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

interface RandomListProps {
  randomList: SearchListData;
  resetRandomData: any;
}

function RandomList({randomList, resetRandomData}: RandomListProps) {
  const convertDistance = () => {
    if (randomList.distance >= 1) {
      return Math.ceil(randomList.distance * 100) / 100 + 'km';
    } else {
      return Math.ceil(randomList.distance * 1000) + 'm';
    }
  };

  return (
    <View>
      <List.Section style={{marginBottom: '8%'}}>
        <View style={styles.subHeader}>
          <View style={styles.sectionTitleView}>
            <Text style={styles.sectionTitle}>오늘의 추천</Text>
          </View>
          <View style={styles.refreshBtnView}>
            <Icon
              onPress={() => {
                resetRandomData();
              }}
              name="refresh"
              size={22}
              color="black"
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.sectionCard}>
          <View style={styles.imageView}>
            {randomList.image === null ? (
              <Image style={styles.image} source={require('./BAB.jpg')} />
            ) : (
              <Image
                source={{
                  uri: `${randomList.image}`,
                }}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.textView}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 7}}>
                <View style={{marginBottom: '2%'}}>
                  <Text style={{fontSize: 16}}>{randomList.name}</Text>
                </View>
                <View style={styles.caDiView}>
                  <View style={{marginRight: '3%'}}>
                    <Text style={{fontSize: 12.5}}>
                      {randomList.secondchild}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12.5}}>|</Text>
                  </View>
                  <View style={{marginLeft: '3%'}}>
                    <Text style={{fontSize: 12.5}}>{convertDistance()}</Text>
                  </View>
                </View>
                <View>
                  <Text>{randomList.address}</Text>
                </View>
              </View>
              <View style={styles.rightIcon}>
                <Icon name="chevron-right" size={28} color="black" />
              </View>
            </View>

            <View style={styles.listBtn}>
              <View style={{flex: 1}}>
                <Button icon="phone" mode="text" color={'black'}>
                  전화
                </Button>
              </View>
              <View style={{flex: 1}}>
                <Button icon="map" mode="text" color={'black'}>
                  길찾기
                </Button>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </List.Section>
      <View style={styles.subHeader}>
        <View style={styles.sectionTitleView}>
          <Text style={styles.sectionTitle}>검색 결과</Text>
        </View>
      </View>
    </View>
  );
}

export default RandomList;
