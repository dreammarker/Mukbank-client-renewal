import React from 'react';
import {View, KeyboardAvoidingView, Image} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

import styles from './SignScreenStyles';

function SignScreen() {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.image}
        />
        <PaperButton
          style={styles.button}
          onPress={() => console.log('aaaaaaaaaaaa')}
          labelStyle={styles.text}
          mode="contained">
          로그인
        </PaperButton>

        <PaperButton
          style={styles.button}
          onPress={() => console.log('aaaaaaaaaaaa')}
          labelStyle={styles.text}
          mode="outlined">
          회원가입
        </PaperButton>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SignScreen;

/*
아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a>
*/
