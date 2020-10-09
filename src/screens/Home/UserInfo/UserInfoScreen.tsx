import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {Button} from 'react-native-paper';

import {Navigation, UserInfo} from '../../../types';
import InfoText from '../../components/InfoText';

type Props = {
  navigation: Navigation;
  userInfo: UserInfo;
  logout: () => Promise<void>;
};

function UserInfoScreen({navigation, userInfo, logout}: Props) {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.image}
        />
        <Text style={styles.header}>회원정보</Text>
        <InfoText title={'아이디'} info={userInfo.id} />
        <InfoText title={'아이디'} info={userInfo.nickname} />
        <InfoText title={'가입일'} info={userInfo.joined} />
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() => logout().then(() => navigation.goBack())}>
            로그아웃
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default UserInfoScreen;

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
  image: {
    marginTop: '15%',
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
    marginBottom: '10%',
  },

  btnView: {width: '100%', marginTop: '5%'},
  btn: {alignSelf: 'flex-end', alignItems: 'flex-end'},
});
