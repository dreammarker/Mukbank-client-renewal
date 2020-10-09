import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {Divider, Button} from 'react-native-paper';

import {Navigation, UserInfo} from '../../../types';

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
        <View style={styles.textContainer}>
          <View style={styles.flexDirection}>
            <View style={styles.titleView}>
              <Text style={styles.title}>아이디</Text>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.info}>{userInfo.id}</Text>
            </View>
          </View>
          <Divider />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.flexDirection}>
            <View style={styles.titleView}>
              <Text style={styles.title}>닉네임</Text>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.info}>{userInfo.nickname}</Text>
            </View>
          </View>
          <Divider />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.flexDirection}>
            <View style={styles.titleView}>
              <Text style={styles.title}>가입일</Text>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.info}>{userInfo.joined}</Text>
            </View>
          </View>
          <Divider />
        </View>
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
  textContainer: {
    marginBottom: '5%',
  },
  flexDirection: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '5%',
    alignItems: 'center',
  },
  titleView: {flex: 1},
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  infoView: {flex: 2},
  info: {fontSize: 16, textAlign: 'left'},
  btnView: {width: '100%', marginTop: '5%'},
  btn: {alignSelf: 'flex-end', alignItems: 'flex-end'},
});
