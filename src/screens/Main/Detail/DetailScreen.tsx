import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import {Paragraph, Card, Appbar, Divider, List} from 'react-native-paper';

import {DetailData, Navigation} from '../../../types';
import Loading from '../../components/Loading';
import Dial from '../../components/Dial';
import IconBtn from '../../components/IconBtn';
import Map from '../../components/Map';

interface Props {
  navigation: Navigation;
  GetCurrentLocation: any;
  route: {
    params: {id: number; destination: {latitude: number; longitude: number}};
  };
}

function DetailScreen({route, navigation, GetCurrentLocation}: Props) {
  const [data, setData] = useState<DetailData[] | any>(undefined);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [chkLike, setChkLike] = useState<boolean>(false);
  const phoneCall = () => {
    // 전화 아이콘 누를 때
    if (data.phone === '') {
      ToastAndroid.showWithGravity(
        '번호가 존재하지 않습니다.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const phone: string = data.phone.split('-').join('');
      Linking.openURL(`tel:${phone}`);
    }
  };
  const gotoLoad = () => {
    // 길찾기 아이콘 누를 때
    GetCurrentLocation().then(() =>
      navigation.navigate('LoadNavi', {
        destination: route.params.destination,
      }),
    );
  };

  const toggleModal = (e: string) => {
    // 모달 보여주는 function
    setModalImage(e);
    setModalVisible(!isModalVisible);
  };

  const onPressLike = async () => {
    try {
      const cookie = await AsyncStorage.getItem('userData');
      if (cookie === null) {
        Alert.alert(
          '로그인',
          '로그인이 필요합니다',
          [
            {
              text: '아니요',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: '예',
              onPress: () => navigation.navigate('Login'),
            },
          ],
          {cancelable: false},
        );
      } else {
        const response = await axios
          .post(
            'http://13.125.78.204:5001/user/restlikeupdate',
            {
              rest_id: route.params.id,
            },
            {withCredentials: true},
          )
          .then((res) => res.data)
          .catch((error) => console.error(error));
        setChkLike(response.likecheck);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLike = async () => {
    try {
      const cookie = await AsyncStorage.getItem('userData');
      if (cookie !== null) {
        const response = await axios
          .post(
            'http://13.125.78.204:5001/user/userrestsel',
            {
              rest_id: route.params.id,
            },
            {withCredentials: true},
          )
          .then((res) => res.data)
          .catch((error) => console.error(error));
        setChkLike(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted: boolean = true;
    if (isMounted) {
      getLike();
    }
    return () => {
      isMounted = false;
      DeviceEventEmitter.emit('Detail');
    };
  }, []);

  useEffect(() => {
    const getData = () => {
      // ListBox 누를 시 넘겨주는 id번호를 이용해 detail api 가져옴
      axios
        .post('http://13.125.78.204:5001/restaurant/detail', {
          rest_id: route.params.id, //  3127  7814 route.params.id
        })
        .then((res) => {
          if (res.data === '') {
            // 결과물 데이터가 없으면 알람 띄어줌
          }
          // 데이터 있으면 setState
          setData(res.data);
        })
        .catch((error) => console.error(error));
    };
    getData();
  }, []);

  return (
    <>
      {data === undefined ? (
        <Loading />
      ) : data === '' ? (
        // 데이터가 없으면 알람
        <Dial
          title={'죄송합니다'}
          paragraph={'상세정보가 존재하지 않습니다.'}
          navigation={navigation}
        />
      ) : (
        // 데이터가 존재 할 시
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.containerContent}>
          <Appbar.Header
            // 스크린 해더에 가게 명 표시
            style={styles.header}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title={data.name.trim()}
              style={styles.headerContent}
            />
            <Appbar.Action />
          </Appbar.Header>

          <Card style={styles.cardView}>
            {data.image === '' ? ( // 이미지 없을 시 file 내에서 가져옴
              <Card.Cover
                source={require('../../../assets/restaurantData.jpg')}
              />
            ) : (
              // 있으면 데이터에서 가져옴
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => toggleModal(data.image)}>
                <Card.Cover source={{uri: data.image}} />
              </TouchableOpacity>
            )}
            <Card.Title title={data.name.trim()} />
            <Card.Content>
              <Paragraph>{data.category}</Paragraph>
              <Paragraph>{data.restdetail}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.cardView}>
            <Card.Actions style={styles.cardActions}>
              {chkLike === true ? (
                <IconBtn
                  iconName={'favorite'}
                  iconTitle={'좋아요'}
                  onPressEvent={onPressLike}
                  color={'red'}
                />
              ) : (
                <IconBtn
                  iconName={'favorite-border'}
                  iconTitle={'좋아요'}
                  onPressEvent={onPressLike}
                  color={'black'}
                />
              )}

              <IconBtn
                iconName={'phone'}
                iconTitle={'전화'}
                onPressEvent={phoneCall}
                color={'black'}
              />
              <IconBtn
                iconName={'map'}
                iconTitle={'길찾기'}
                onPressEvent={gotoLoad}
                color={'black'}
              />
            </Card.Actions>
          </Card>
          <Card style={styles.cardView}>
            <List.Item
              title={data.phone}
              left={(props) => <List.Icon {...props} icon="phone" />}
              titleStyle={styles.listTitle}
            />
            <Divider />
            <List.Item
              title={data.clock}
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
              titleStyle={styles.listTitle}
            />
            <Divider />
            <List.Item
              title={JSON.parse(data.option).join(', ')}
              left={(props) => <List.Icon {...props} icon="content-paste" />}
              titleStyle={styles.listTitle}
            />
            <Divider />
            <List.Item
              title={data.roadAddress}
              left={(props) => <List.Icon {...props} icon="map" />}
              titleStyle={styles.listTitle}
            />
            <Divider />
          </Card>
          <Card style={styles.cardView}>
            <Card.Title title="메뉴" />
            {data.menuImage === '' ? (
              // 이미지 없을 시 file 내에서 가져옴
              <Card.Cover source={require('../../../assets/menu.jpg')} />
            ) : (
              // 있으면 데이터에서 가져옴
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => toggleModal(data.menuImage)}>
                <Card.Cover source={{uri: data.menuImage}} />
              </TouchableOpacity>
            )}
            {data.menu === '[]' ? (
              // 데이터에 메뉴정보 없을 시
              <List.Item title="메뉴 준비중" />
            ) : (
              // 있으면 accordion
              <List.Accordion title="메뉴 보기" titleStyle={styles.accordion}>
                <Divider />
                {JSON.parse(data.menu).map((item: string) => (
                  <View key={JSON.stringify(item)}>
                    <List.Item title={item} />
                    <Divider />
                  </View>
                ))}
              </List.Accordion>
            )}
          </Card>
          <Card style={styles.cardView}>
            <Card.Title title="위치" />
            <TouchableOpacity style={styles.mapContainer} activeOpacity={1}>
              <Map
                initialRegion={{
                  latitude: Number(route.params.destination.latitude), //  Number(route.params.destination.latitude),
                  longitude: Number(route.params.destination.longitude), //  Number(route.params.destination.longitude),
                  latitudeDelta: 0.004,
                  longitudeDelta: 0.004,
                }}
                scrollEnabled={false}>
                <Marker
                  coordinate={{
                    latitude: Number(route.params.destination.latitude), // 37.568735912, Number(route.params.destination.latitude),
                    longitude: Number(route.params.destination.longitude), // Number(route.params.destination.longitude),
                    title: data.name.trim(),
                    subtitle: data.roadAddress,
                  }}
                />
              </Map>
            </TouchableOpacity>
          </Card>
          {/* 이미지 클릭했을 때 full 사진 보여주는 모달창 띄우기*/}
          <Modal
            isVisible={isModalVisible}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            onBackButtonPress={() => toggleModal('')}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => toggleModal('')}
              style={styles.modal}>
              <Icon name="close" size={28} color="black" />
              <View>
                <Image
                  source={{
                    uri: `${modalImage}`,
                  }}
                  style={styles.modalImage}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      )}
    </>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containerContent: {
    paddingTop: 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
  },
  header: {backgroundColor: '#fff'},
  headerContent: {
    alignItems: 'center',
  },
  cardView: {margin: 4},
  cardActions: {flexDirection: 'row'},
  listTitle: {fontSize: 15, flexDirection: 'row'},
  accordion: {color: 'black'},
  mapContainer: {
    margin: 15,
    height: 150,
  },
  modal: {flex: 1, backgroundColor: '#fff'},
  modalImage: {width: '100%', height: '100%', resizeMode: 'contain'},
});
