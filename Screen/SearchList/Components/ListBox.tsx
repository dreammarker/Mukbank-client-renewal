import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ListBoxImg from './ListBoxImg';
import ListBoxText from './ListBoxText';
type list = {
  id: number;
  name: string;
  kind: string;
  address: string;
};

function ListBox(list: list) {
  console.log(list);
  return (
    <View>
      <TouchableOpacity>
        <ListBoxImg />
        <ListBoxText list={list} />
      </TouchableOpacity>
    </View>
  );
}

export default ListBox;
