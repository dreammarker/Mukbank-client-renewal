import React from 'react';
import {View, KeyboardAvoidingView, Image, StyleSheet} from 'react-native';

import {Navigation} from '../../../types';
import Btn from '../../components/Btn';

interface Props {
  navigation: Navigation;
}

function SignScreen({navigation}: Props) {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.image}
        />
        <Btn mode="contained" onPress={() => navigation.navigate('Login')}>
          로그인
        </Btn>
        <Btn mode="outlined" onPress={() => navigation.navigate('SignUp')}>
          회원가입
        </Btn>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SignScreen;

/*
아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a>
*/

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: '50%',
    width: 200,
    height: 200,
    marginBottom: 50,
  },
});
