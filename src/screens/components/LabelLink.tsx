import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;
type Props = {
  labelText: string;
  LinkText: string;
  navigation: Navigation;
  Navi: any;
};

const LabelLink = ({labelText, LinkText, Navi, navigation}: Props) => (
  <View style={styles.row}>
    <Text style={styles.label}>{labelText}</Text>
    <TouchableOpacity onPress={() => navigation.navigate(Navi)}>
      <Text style={styles.link}>{LinkText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {color: '#414757'},
  link: {
    fontWeight: 'bold',
    color: '#600EE6',
  },
});

export default LabelLink;
