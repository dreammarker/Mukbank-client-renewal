import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Avatar} from 'react-native-paper';

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
    <View style={{height: 200}}>
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
    </View>
  );
}

export default RandomList;
