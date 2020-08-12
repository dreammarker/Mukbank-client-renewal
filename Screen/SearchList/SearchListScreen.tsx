import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, Button} from 'react-native';

type NavigationProp = StackNavigationProp<MainStackNaviParamList, 'Detail'>;
interface Props {
  navigation: NavigationProp;
}
function SearchListScreen({navigation}: Props) {
  return (
    <>
      <Text>SearchList이다</Text>
      <Button
        title="Detail 이동"
        onPress={() => navigation.navigate('Detail')}
      />
    </>
  );
}

export default SearchListScreen;
