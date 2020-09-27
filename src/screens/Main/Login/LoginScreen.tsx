import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {HelperText} from 'react-native-paper';
import {View, StyleSheet, KeyboardAvoidingView, Text} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

import Btn from '../../components/Btn';
import TextInput from '../../components/TextInput';
import LabelLink from '../../components/LabelLink';
import Alert from '../../components/Alert';

type checkText = {value: string; error: string | boolean};

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;

type Props = {
  navigation: Navigation;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginScreen({navigation, setIsLogin}: Props) {
  const [id, setId] = useState<checkText>({value: '', error: ''});
  const [password, setPassword] = useState<checkText>({value: '', error: ''});
  const [errorText, setErrorText] = useState<string>('');
  const [pass, setPass] = useState<boolean>(false);

  const idBlacnkCheck = (idVal: string) => {
    return idVal === '';
  };

  const passwordBlacnkCheck = (passwordVal: string) => {
    return passwordVal === '';
  };

  const onLoginPress = () => {
    const idError = idBlacnkCheck(id.value);
    const passwordError = passwordBlacnkCheck(password.value);

    if (idError || passwordError) {
      setId({...id, error: idError});
      setPassword({...password, error: passwordError});
      return;
    } else {
      axios
        .post(
          'http://192.168.0.4:5001/user/signin',
          {
            id: id.value,
            password: password.value,
          },
          {withCredentials: true},
        )
        .then((res) => {
          if (res.data === '없는 아이디거나 잘못된 비밀번호 입니다.') {
            setErrorText(res.data);
          } else if (res.data === '로그인되었습니다.') {
            const storageToken = async () => {
              try {
                const [cookie] = res.headers['set-cookie']; // 헤더로 들어온 쿠키
                await AsyncStorage.setItem('userData', JSON.stringify(cookie));
                return cookie;
              } catch (error) {
                console.error(error);
              }
            };
            storageToken();
            setIsLogin(true);
            setPass(true);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      {pass ? (
        <Alert
          title={'로그인'}
          paragraph={'로그인이 완료되었습니다'}
          navigation={navigation}
          Navi={'Map'}
        />
      ) : (
        <View style={styles.background}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.header}>Login</Text>
            <TextInput
              label="아이디"
              returnKeyType="next"
              value={id.value}
              onChangeText={(text) => setId({value: text, error: ''})}
              autoCapitalize="none"
              autoCompleteType="username"
              textContentType="username"
              error={!!id.error}
              errorText={'아이디를 입력해 주세요'}
              visible={idBlacnkCheck(id.value)}
            />

            <TextInput
              label="비밀번호"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({value: text, error: ''})}
              error={!!password.error}
              errorText={'비밀번호를 입력해 주세요'}
              visible={passwordBlacnkCheck(password.value)}
              secureTextEntry
            />

            <View style={styles.error}>
              <HelperText type="error" visible={true}>
                {errorText}
              </HelperText>
            </View>

            <Btn mode="contained" onPress={() => onLoginPress()}>
              로그인
            </Btn>

            <LabelLink
              labelText={'계정이 없으신가요? '}
              LinkText={'회원가입'}
              navigation={navigation}
              Navi={'SignUp'}
            />
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}

export default LoginScreen;

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
    marginTop: '50%',
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
