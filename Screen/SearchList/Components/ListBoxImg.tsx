import React from 'react';
import {Avatar} from 'react-native-paper';
import {Grid, Col} from 'react-native-easy-grid';
import {View, TouchableOpacity} from 'react-native';

function ListBoxImg() {
  return (
    <>
      <TouchableOpacity>
        <Grid>
          <Col
            size={1}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10%',
            }}>
            <View>
              <Avatar.Image size={80} source={require('./BAB.jpg')} />
            </View>
          </Col>
        </Grid>
      </TouchableOpacity>
    </>
  );
}
export default ListBoxImg;