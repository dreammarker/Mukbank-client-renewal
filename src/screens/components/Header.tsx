import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Navigation} from 'src/types';

type Props = {navigation: Navigation; title: string};

const Header = ({navigation, title}: Props) => (
  <Appbar.Header style={styles.header}>
    <Appbar.BackAction onPress={() => navigation.goBack()} />
    <Appbar.Content title={title} style={styles.headerContent} />
    <Appbar.Action />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  header: {backgroundColor: '#fff'},
  headerContent: {
    alignItems: 'center',
  },
});

export default Header;
