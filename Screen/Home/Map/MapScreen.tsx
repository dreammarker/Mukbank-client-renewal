import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, Button} from 'react-native';

type NavigationProp = StackNavigationProp<MainStackNaviParamList, 'Search'>;
interface Props {
  navigation: NavigationProp;
}

function MapScreen({navigation}: Props) {
  return (
    <>
      <Text>hi</Text>
      <Button
        title="Search로 이동"
        onPress={() => navigation.navigate('Search')}
      />
    </>
  );
}

export default MapScreen;
