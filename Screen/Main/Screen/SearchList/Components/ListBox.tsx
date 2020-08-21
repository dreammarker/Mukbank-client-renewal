import React from 'react';
import {Grid, Col} from 'react-native-easy-grid';
import {View, TouchableOpacity} from 'react-native';

import ListBoxImg from './ListBoxImg';
import ListBoxText from './ListBoxText';

function ListBox({list}: any) {
  return (
    <View>
      <TouchableOpacity>
        <Grid>
          <Col size={1}>
            <ListBoxImg />
          </Col>
          <Col size={3}>
            <ListBoxText list={list} />
          </Col>
        </Grid>
      </TouchableOpacity>
    </View>
  );
}

export default ListBox;
