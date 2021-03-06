import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Title, Drawer, Button} from 'react-native-paper';

import {UserInfo, Navigation} from '../../../types';

interface Props {
  navigation: Navigation;
  userInfo: UserInfo;
  isLogin: boolean;
  logout: () => Promise<void>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomDrawerContent(
  {navigation, userInfo, isLogin, logout}: Props,
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  const logoutAlert = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '아니요',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '예',
          onPress: () => logout().then(() => navigation.goBack()),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {isLogin === false ? (
          <View style={styles.logIn}>
            <Button
              labelStyle={styles.btnLabel}
              mode="contained"
              onPress={() => navigation.navigate('Sign')}>
              로그인
            </Button>
          </View>
        ) : (
          <>
            <View style={styles.userInfoSection}>
              <Title style={styles.title}>{userInfo.nickname}님</Title>
              <View style={styles.row}></View>
            </View>

            <View style={[styles.drawerContent]}>
              <Drawer.Section style={styles.drawerSection}>
                <View style={styles.drawerSectionMargin}>
                  <Title style={styles.drawerItemTitle}>좋아요한 리스트</Title>
                </View>
                <DrawerItem
                  icon={() => (
                    <Icons
                      name="restaurant-outline"
                      color={'black'}
                      size={22}
                    />
                  )}
                  label="음식점"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() =>
                    navigation.navigate('LikeList', {
                      parent: '음식점',
                    })
                  }
                />
                <DrawerItem
                  icon={() => (
                    <Icons name="cafe-outline" color={'black'} size={22} />
                  )}
                  label="카페"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() =>
                    navigation.navigate('LikeList', {
                      parent: '카페',
                    })
                  }
                />
              </Drawer.Section>

              <Drawer.Section style={styles.drawerSection}>
                <View style={styles.drawerSectionMargin}>
                  <Title style={styles.drawerItemTitle}>회원</Title>
                </View>
                <DrawerItem
                  icon={() => (
                    <Icons name="person-outline" color={'black'} size={22} />
                  )}
                  label="회원정보"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => navigation.navigate('UserInfo')}
                />
                <DrawerItem
                  icon={() => (
                    <Icons name="log-out-outline" color={'black'} size={22} />
                  )}
                  label="로그아웃"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => logoutAlert()}
                />
              </Drawer.Section>
            </View>
          </>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  logIn: {
    marginVertical: 10,
    paddingTop: 50,
    marginLeft: '15%',
    marginRight: '15%',
  },
  btnLabel: {fontWeight: 'bold', fontSize: 16, lineHeight: 28},
  userInfoSection: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerSectionMargin: {marginLeft: 20},
  drawerItemTitle: {fontSize: 17},
  drawerItemLabel: {fontSize: 16, color: 'black'},
});
