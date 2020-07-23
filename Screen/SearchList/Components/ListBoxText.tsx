import React from 'react';
import {Divider} from 'react-native-paper';
import {Grid, Col} from 'react-native-easy-grid';

import {Text} from 'react-native';

function ListBoxText({list}: any) {
  return (
    <>
      <Col size={3}>
        <Grid>
          <Col size={5}>
            <Text>{list.name}</Text>
            <Divider style={{backgroundColor: 'gray'}} />
            <Text>{list.kind}</Text>
            <Text>{list.distance}km</Text>
            <Text>{list.address}</Text>
          </Col>
        </Grid>
      </Col>
    </>
  );
}
export default ListBoxText;
