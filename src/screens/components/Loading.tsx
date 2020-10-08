import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => (
  <View // 로딩중 표시
    style={[styles.container, styles.position]}>
    <ActivityIndicator animating={true} size="large" />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  position: {justifyContent: 'center'},
});
