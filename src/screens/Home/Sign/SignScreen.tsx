import React from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './SignScreenStyles';
import Button from './Button';

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface Props {
  navigation: NavigationProp;
}

function SignScreen({navigation}: Props) {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.image}
        />
        <Button mode="contained" onPress={() => navigation.navigate('Login')}>
          로그인
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('SignUp')}>
          회원가입
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SignScreen;

/*
아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a>
*/
