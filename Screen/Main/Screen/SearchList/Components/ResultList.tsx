import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
interface SearchListData {
  adress: string;
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

function ResultList({item}: SearchListData) {
  console.log('-------------------------------------------', item.name);
  return (
    <>
      <Text>{item.name}</Text>
    </>
  );
}

export default ResultList;
