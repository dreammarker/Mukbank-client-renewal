import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentOptions,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {Avatar, Title, Drawer} from 'react-native-paper';

function CustomDrawerContent(
  {navigation, userInfo},
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          {/* <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          /> */}
          <Title style={styles.title}>{userInfo.id}님</Title>
          <View style={styles.row}></View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <View style={{marginLeft: 20}}>
            <Title style={{fontSize: 17}}>회원</Title>
          </View>
          <DrawerItem
            icon={() => (
              <Icons name="person-outline" color={'black'} size={22} />
            )}
            label="회원정보"
            labelStyle={{fontSize: 16, color: 'black'}}
            onPress={() => {}}
          />
          <DrawerItem
            icon={() => (
              <Icons name="log-out-outline" color={'black'} size={22} />
            )}
            label="로그아웃"
            labelStyle={{fontSize: 16, color: 'black'}}
            onPress={() => {}}
          />
        </Drawer.Section>
      </View>
      <View style={[styles.drawerContent]}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={{marginLeft: 20}}>
            <Title style={{fontSize: 17}}>좋아요한 리스트</Title>
          </View>
          <DrawerItem
            icon={() => (
              <Icons name="restaurant-outline" color={'black'} size={22} />
            )}
            label="음식점"
            labelStyle={{fontSize: 16, color: 'black'}}
            onPress={() => {}}
          />
          <DrawerItem
            icon={() => <Icons name="cafe-outline" color={'black'} size={22} />}
            label="카페"
            labelStyle={{fontSize: 16, color: 'black'}}
            onPress={() => {}}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 15,
  },
});
