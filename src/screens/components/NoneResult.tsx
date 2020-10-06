import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {text: string};

const NoneResult = ({text}: Props) => (
  <View style={styles.noneResult}>
    <Text style={styles.noneResultText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  noneResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  noneResultText: {fontSize: 15},
});

export default NoneResult;
