import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {
  Paragraph,
  Card,
  Appbar,
  Divider,
  List,
  ActivityIndicator,
} from 'react-native-paper';

import styles from './DetailStyles';
import Alert from './Alert';
import IconBtn from './IconBtn';

interface DetailData {
  name: string;
  image: string;
  restdetail: string;
  menuImage: string;
  option: string;
  longitude: string;
  menu: string;
  category: string;
  phone: string;
}
type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface DetailProps {
  navigation: NavigationProp;
  GetCurrentLocation: any;
  route: {
    params: {id: number; destination: {latitude: number; longitude: number}};
  };
}

function DetailScreen({route, navigation, GetCurrentLocation}: DetailProps) {
  const [data, setData] = useState<DetailData[] | any>(undefined);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>('');

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

  const toggleLike = () => {
    // 좋아요 아이콘 누를 때
    console.log('좋아요 누름');
  };

  const gotoDetail = () => {
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

  const closeDialog = () => {
    // 데이터 없을 시 보여주는 alert function
    setIsDialogVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    const getData = () => {
      // ListBox 누를 시 넘겨주는 id번호를 이용해 detail api 가져옴
      axios
        .post('http:/172.30.1.30:5001/restaurant/detail', {
          rest_id: route.params.id, //  3127  7814 route.params.id
        })
        .then((res) => {
          if (res.data === '') {
            // 결과물 데이터가 없으면 알람 띄어줌
            setIsDialogVisible(true);
          }
          // 데이터 있으면 setState
          setData(res.data);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  return (
    <>
      {data === undefined ? (
        <View // 로딩중 표시
          style={[styles.container, {justifyContent: 'center'}]}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : data === '' ? (
        // 데이터가 없으면 알람
        <Alert
          isDialogVisible={isDialogVisible}
          closeDialog={closeDialog}
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
              <IconBtn
                onPressEvent={toggleLike}
                iconName={'favorite-border'}
                iconTitle={'좋아요'}
              />
              <IconBtn
                onPressEvent={phoneCall}
                iconName={'phone'}
                iconTitle={'전화'}
              />
              <IconBtn
                onPressEvent={gotoDetail}
                iconName={'map'}
                iconTitle={'길찾기'}
              />
            </Card.Actions>
          </Card>
          <Card style={styles.cardView}>
            <List.Item
              title={data.clock}
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
            />
            <Divider />
            <List.Item
              title={JSON.parse(data.option).join(', ')}
              left={(props) => <List.Icon {...props} icon="content-paste" />}
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
