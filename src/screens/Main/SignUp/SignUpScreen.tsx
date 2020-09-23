import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
// import {TextInput, HelperText} from 'react-native-paper';

import Btn from '../../components/Btn';
import TextInput from '../../components/TextInput';

type checkText = {value: string; error: string | boolean};
interface Props {}

function SignUpScreen({navigation}) {
  const [id, setId] = useState<checkText>({value: '', error: ''});
  const [password, setPassword] = useState<checkText>({value: '', error: ''});
  const [chkPwd, setChkPwd] = useState<checkText>({value: '', error: ''});
  const [nickname, setNickname] = useState<checkText>({value: '', error: ''});

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

  const nickNameValidator = (nicknameVal: string) => {
    return !(nicknameVal.length > 0 && nicknameVal.length <= 8);
  };

  const SignUpPressed = () => {
    const idError = idValidator(id.value);
    const passwordError = passwordValidator(password.value);
    const chkPwdError = checkPassword(chkPwd.value);
    const nicknameError = checkPassword(nickname.value);
    if (idError || passwordError || chkPwdError || nicknameError) {
      setId({...id, error: idError});
      setPassword({...password, error: passwordError});
      setChkPwd({...chkPwd, error: chkPwdError});
      setNickname({...nickname, error: nicknameError});
      return;
    }
    console.log('통과');
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>SignUp</Text>

        <TextInput
          label="아이디"
          returnKeyType="next"
          value={id.value}
          onChangeText={(text) => setId({value: text, error: ''})}
          error={!!id.error}
          errorText={'영어, 숫자포함 5~8 이내'}
          visible={idValidator(id.value)}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="username"
        />

        <TextInput
          label="비밀번호"
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={'특수문자, 영대소문자, 숫자포함 8~15 이내'}
          visible={passwordValidator(password.value)}
          secureTextEntry
        />

        <TextInput
          label="비밀번호 확인"
          returnKeyType="next"
          value={chkPwd.value}
          onChangeText={(text) => setChkPwd({value: text, error: ''})}
          error={!!chkPwd.error}
          errorText={'일치하지 않습니다.'}
          visible={checkPassword(chkPwd.value)}
          secureTextEntry
        />

        <TextInput
          label="닉네임"
          returnKeyType="done"
          value={nickname.value}
          onChangeText={(text) => setNickname({value: text, error: ''})}
          error={!!nickname.error}
          errorText={'1 ~ 8 글자 이내'}
          visible={nickNameValidator(nickname.value)}
        />

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
