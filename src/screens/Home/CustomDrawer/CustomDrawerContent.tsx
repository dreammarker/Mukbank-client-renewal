import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  DrawerItem,
  DrawerNavigationProp,
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Title, Drawer} from 'react-native-paper';

type TypeDrawerProp = DrawerNavigationProp<HomeDrawerNaviParamList>;

interface Props {
  navigation: TypeDrawerProp;
  userInfo: {id: string; nickname: string};
  // 36.9919666, 127.5896299:
  setUserInfo: any;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomDrawerContent(
  {navigation, userInfo, setUserInfo, setIsLogin}: Props,
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  const logout = async () => {
    try {
      const response = await axios
        .get('http://172.30.1.52:5001/user/signout')
        .then((res) => res.data)
        .catch((error) => console.error(error));

      if (response === '로그아웃 되었습니다.') {
        await AsyncStorage.removeItem('userData');
        setUserInfo({id: '', nickname: ''});
        setIsLogin(false);
        ToastAndroid.showWithGravity(
          '로그아웃이 완료되었습니다.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          onPress: () => logout().then(() => navigation.closeDrawer()),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {userInfo.id === '' ? (
          <TouchableOpacity
            style={styles.logIn}
            activeOpacity={1}
            onPress={() => navigation.navigate('Sign')}>
            <Title style={styles.loginTitle}>로그인해주세요</Title>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.userInfoSection}>
              {/* <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          /> */}
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
                  onPress={() => navigation.navigate('LikeList')}
                />
                <DrawerItem
                  icon={() => (
                    <Icons name="cafe-outline" color={'black'} size={22} />
                  )}
                  label="카페"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => console.log('라이크리스트눌렀다')}
                />
              </Drawer.Section>

              <Drawer.Section style={styles.drawerSection}>
                <View style={styles.drawerSectionMargin}>
                  <Title style={styles.drawerItemTitle}>회원</Title>
                </View>
                {/* <DrawerItem
                  icon={() => (
                    <Icons name="person-outline" color={'black'} size={22} />
                  )}
                  label="회원정보"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => navigation.navigate('UserInfo')}
                /> */}
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
    paddingTop: 50,
  },
  loginTitle: {textAlign: 'center'},
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
