import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  DrawerItem,
  DrawerNavigationProp,
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Avatar, Title, Drawer} from 'react-native-paper';

import styles from './styles';

type TypeDrawerProp = DrawerNavigationProp<HomeDrawerNaviParamList>;

interface Props {
  navigation: TypeDrawerProp;
  userInfo: {id: string; nickname: string};
  // 36.9919666, 127.5896299
}

function CustomDrawerContent(
  {navigation, userInfo}: Props,
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
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
                  onPress={() => console.log('라이크리스트눌렀다')}
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
                <DrawerItem
                  icon={() => (
                    <Icons name="person-outline" color={'black'} size={22} />
                  )}
                  label="회원정보"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => console.log('회원정보 눌렀다')}
                />
                <DrawerItem
                  icon={() => (
                    <Icons name="log-out-outline" color={'black'} size={22} />
                  )}
                  label="로그아웃"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => console.log('로그아웃했다')}
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
