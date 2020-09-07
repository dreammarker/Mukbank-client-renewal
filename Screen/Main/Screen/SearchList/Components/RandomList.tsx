import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {List, Avatar} from 'react-native-paper';
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
      <List.Section style={{marginBottom: '13%'}}>
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
        <TouchableOpacity>
          <View>
            {randomList.image === null ? (
              <Avatar.Image size={24} source={require('./BAB.jpg')} />
            ) : (
              <Avatar.Image
                size={24}
                source={{
                  uri: `${randomList.image}`,
                }}
              />
            )}
          </View>
          <Text>{randomList.name}</Text>
          <Text>{randomList.secondchild}</Text>
          <Text>{convertDistance()}</Text>
          <Text>{randomList.address}</Text>
          <Text>{randomList.phone}</Text>
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
