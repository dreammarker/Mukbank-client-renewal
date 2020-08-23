import React from 'react';

import {Chip} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
// import axios from 'axios';

import styles from './ChipListStyles';

type NavigationProp = StackNavigationProp<HomeStackNaviParamList, 'SearchList'>;

interface ChipListProps {
  navigation: NavigationProp;
  list: any;
}

function ChipList({navigation, list}: ChipListProps) {
  // const ClickFilter = (kind:string) => {
  //   axios({method: 'post', url : `~~~~~~~~`, data: {
  //     latitude: latitude,
  //     longitude: lingitude,
  //     kind: kind
  //       }}).then(navigation.navigate('SearchList'))
  //       }
  // }

  return (
    <>
      <Chip
        mode="outlined"
        height={35}
        textStyle={{fontSize: 16}}
        style={styles.chips as any}
        // onPress={() => ClickFilter(list.name)}
        onPress={() => navigation.navigate('SearchList')}>
        {list.name}
      </Chip>
    </>
  );
}
export default ChipList;
