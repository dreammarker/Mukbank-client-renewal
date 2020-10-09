import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';

type Props = {
  title: string;
  info: string;
};

const InfoText = ({title, info}: Props) => (
  <View style={styles.textContainer}>
    <View style={styles.flexDirection}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.info}>{info}</Text>
      </View>
    </View>
    <Divider />
  </View>
);

export default InfoText;

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: '5%',
  },
  flexDirection: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '5%',
    alignItems: 'center',
  },
  titleView: {flex: 1},
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  infoView: {flex: 2},
  info: {fontSize: 16, textAlign: 'left'},
});
