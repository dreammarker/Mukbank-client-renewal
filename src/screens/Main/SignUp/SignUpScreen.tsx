import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

import Btn from '../../components/Btn';

type checkText = {value: string; error: string | boolean};
interface Props {}

function SignUpScreen({navigation}) {
  const [id, setId] = useState<checkText>({value: '', error: ''});

  const idValidator = (idVal: string) => {
    var idReg = /^[a-zA-Z](?=.{0,28}[0-9])[0-9a-zA-Z]{5,8}$/; // 영숫자포함 5~8 정규표현식
    return !idReg.test(idVal);
  };

  const SignUpPressed = () => {
    const idError = idValidator(id.value);

    if (idError) {
      setId({...id, error: idError});
    } else {
      console.log('통과');
    }
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>회원가입</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="아이디"
            mode={'outlined'}
            value={id.value}
            returnKeyType="next"
            onChangeText={(text) => setId({value: text, error: ''})}
            error={!!id.error}
          />
          <HelperText type="error" visible={idValidator(id.value)}>
            {/* visible이 false면 에러 */}
            아이디는 영숫자포함 5~8 이내 입니다.
          </HelperText>
        </View>
        <Btn mode="contained" onPress={() => SignUpPressed()}>
          회원가입
        </Btn>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 12,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {},
  link: {
    fontWeight: 'bold',
  },
});
