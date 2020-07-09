import React from 'react';
import {Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<MainStackNaviParamList, 'SearchList'>;
interface Props {
  navigation: NavigationProp;
}

function SearchScreen({navigation}: Props) {
  // 검색 했을 때 모달창으로 list를 띄어야 하는지.. 아니면 새로운 창으로 넣어야 하는지
  return (
    <>
      <Text>Search이다</Text>
      <Button
        title="SearchList로 이동"
        onPress={() => navigation.navigate('SearchList')}
      />
    </>
  );
}

export default SearchScreen;
