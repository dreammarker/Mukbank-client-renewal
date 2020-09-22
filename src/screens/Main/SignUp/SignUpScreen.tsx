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
  const [password, setPassword] = useState<checkText>({value: '', error: ''});
  const [chkPwd, setChkPwd] = useState<checkText>({
    value: '',
    error: '',
  });

  const idValidator = (idVal: string) => {
    var idReg = /^[a-zA-Z](?=.{0,28}[0-9])[0-9a-zA-Z]{5,8}$/; // 영숫자포함 5~8 정규표현식
    return !idReg.test(idVal);
  };

  const passwordValidator = (passwordVal: string) => {
    var passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/; // 특수문자,영대소문자,숫자포함 8~15 정규표현식
    return !passwordReg.test(passwordVal);
  };

  const checkPassword = (chkPasswordVal: string) => {
    return !(chkPasswordVal === password.value);
  };
  console.log(chkPwd.error);
  const SignUpPressed = () => {
    const idError = idValidator(id.value);
    const passwordError = passwordValidator(password.value);
    const chkPwdError = checkPassword(chkPwd.value);
    if (idError || passwordError || chkPwdError) {
      setId({...id, error: idError});
      setPassword({...password, error: passwordError});
      setChkPwd({...chkPwd, error: chkPwdError});
      return;
    } else {
      console.log('통과');
    }
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>SignUp</Text>
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
            영어, 숫자포함 5~8 이내
          </HelperText>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="비밀번호"
            mode={'outlined'}
            value={password.value}
            returnKeyType="done"
            onChangeText={(text) => setPassword({value: text, error: ''})}
            error={!!password.error}
            secureTextEntry
          />
          <HelperText type="error" visible={passwordValidator(password.value)}>
            특수문자, 영대소문자, 숫자포함 8~15 이내
          </HelperText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="비밀번호확인"
            mode={'outlined'}
            value={chkPwd.value}
            returnKeyType="done"
            onChangeText={(text) => setChkPwd({value: text, error: ''})}
            error={!!chkPwd.error}
            secureTextEntry
          />
          <HelperText type="error" visible={checkPassword(chkPwd.value)}>
            일치하지 않습니다.
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
    marginVertical: 6,
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
