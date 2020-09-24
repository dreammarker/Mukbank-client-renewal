import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Text} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

import Btn from '../../components/Btn';
import TextInput from '../../components/TextInput';
import LabelLink from '../../components/LabelLink';

type checkText = {value: string; error: string | boolean};

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;

type Props = {
  navigation: Navigation;
};

function LoginScreen({navigation}: Props) {
  const [id, setId] = useState<checkText>({value: '', error: ''});
  const [password, setPassword] = useState<checkText>({value: '', error: ''});

  const onLoginPress = () => {
    console.log('로그인 눌렀다');
    // navigation.replace('Map')
  };

  return (
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
        />
        <TextInput
          label="비밀번호"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({value: text, error: ''})}
          secureTextEntry
        />
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
});
