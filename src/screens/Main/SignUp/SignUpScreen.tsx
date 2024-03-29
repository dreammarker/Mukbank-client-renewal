import React, {useState} from 'react';
import axios from 'axios';
import {View, StyleSheet, KeyboardAvoidingView, Text} from 'react-native';
import {HelperText} from 'react-native-paper';

import {CheckText, Navigation} from '../../../types';
import Btn from '../../components/Btn';
import TextInput from '../../components/TextInput';
import LabelLink from '../../components/LabelLink';
import Dial from '../../components/Dial';

interface Props {
  navigation: Navigation;
}

function SignUpScreen({navigation}: Props) {
  const [id, setId] = useState<CheckText>({value: '', error: ''});
  const [password, setPassword] = useState<CheckText>({value: '', error: ''});
  const [chkPwd, setChkPwd] = useState<CheckText>({value: '', error: ''});
  const [nickname, setNickname] = useState<CheckText>({value: '', error: ''});
  const [errorText, setErrorText] = useState<string>('');
  const [pass, setPass] = useState<boolean>(false);

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
    return !(nicknameVal !== '' && nicknameVal.length <= 8);
  };

  const onPressSignUp = () => {
    const idError = idValidator(id.value);
    const passwordError = passwordValidator(password.value);
    const chkPwdError = checkPassword(chkPwd.value);
    const nicknameError = nickNameValidator(nickname.value);
    if (idError || passwordError || chkPwdError || nicknameError) {
      setId({...id, error: idError});
      setPassword({...password, error: passwordError});
      setChkPwd({...chkPwd, error: chkPwdError});
      setNickname({...nickname, error: nicknameError});
      return;
    } else {
      axios
        .post('user/signup', {
          id: id.value,
          nickname: nickname.value,
          password: password.value,
        })
        .then((res) => {
          const chkId: boolean = res.data.id;
          const chkNik: boolean = res.data.nickname;
          if (!chkId && !chkNik) {
            setErrorText('아이디, 닉네임을 다른유저가 사용중 입니다.');
            setId({value: '', error: true});
            setNickname({value: '', error: true});
          } else if (!chkId) {
            setErrorText('아이디를 다른유저가 사용중 입니다.');
            setId({value: '', error: true});
          } else if (!chkNik) {
            setErrorText('닉네임을 다른유저가 사용중 입니다.');
            setNickname({value: '', error: true});
          } else if (chkId && chkNik) {
            setPass(true);
          }
        });
    }
  };

  return (
    <>
      {pass ? (
        <Dial
          title={'가입 완료'}
          paragraph={'회원가입이 완료되었습니다.'}
          navigation={navigation}
          Navi={'Map'}
        />
      ) : (
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
            <View style={styles.error}>
              <HelperText type="error" visible={true}>
                {errorText}
              </HelperText>
            </View>

            <Btn mode="contained" onPress={() => onPressSignUp()}>
              회원가입
            </Btn>

            <LabelLink
              labelText={'이미 계정이 있으신가요? '}
              LinkText={'로그인'}
              navigation={navigation}
              Navi={'Login'}
            />
          </KeyboardAvoidingView>
        </View>
      )}
    </>
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
  error: {alignSelf: 'flex-start'},
});
