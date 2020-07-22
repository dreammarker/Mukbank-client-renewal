import React, {useState} from 'react';
import {Grid, Col} from 'react-native-easy-grid';
import {View, Text, TouchableOpacity} from 'react-native';
function ListBoxText(list: any) {
  console.log(list);
  return (
    <>
      <Col size={3}>
        <Grid>
          <Col size={5}>
            <Text>{list.name}</Text>
            <Text>{list.address}</Text>
            <Text>{list.secondchild}</Text>
          </Col>
        </Grid>
      </Col>
    </>
  );
}
export default ListBoxText;
