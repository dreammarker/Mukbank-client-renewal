import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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

function ResultList({list}: SearchListData) {
  const convertDistance = () => {
    if (list.distance >= 1) {
      return Math.ceil(list.distance * 100) / 100 + 'km';
    } else {
      return Math.ceil(list.distance * 1000) + 'm';
    }
  };

  return (
    <TouchableOpacity>
      <View>
        {list.image === null ? (
          <Avatar.Image size={24} source={require('./BAB.jpg')} />
        ) : (
          <Avatar.Image
            size={24}
            source={{
              uri: `${list.image}`,
            }}
          />
        )}
      </View>
      <Text>{list.name}</Text>
      <Text>{list.secondchild}</Text>
      <Text>{convertDistance()}</Text>
      <Text>{list.address}</Text>
      <Text>{list.phone}</Text>
    </TouchableOpacity>
  );
}

export default ResultList;
