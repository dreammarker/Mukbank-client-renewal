import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import {
  Paragraph,
  Card,
  useTheme,
  Appbar,
  Divider,
  List,
  ActivityIndicator,
} from 'react-native-paper';

interface DetailData {
  name: string | null;
  image: string | null;
  restdetail: string | null;
  menuImage: string | null;
  option: string;
  longitude: string;
  menu: string;
  category: string;
  phone: string;
}
type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface DetailProps {
  data: DetailData;
  navigation: NavigationProp;
  GetCurrentLocation: any;
  route: {
    params: {id: number; destination: {latitude: number; longitude: number}};
  };
}

function DetailScreen({route, navigation, GetCurrentLocation}: DetailProps) {
  const [data, setData] = useState<DetailData | undefined | string>(undefined);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');

  const toggleModal = (e: string) => {
    setModalImage(e);
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const getData = () => {
      axios
        .post('http:/192.168.0.4:5001/restaurant/detail', {
          rest_id: route.params.id,
        })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  const {
    colors: {background},
  } = useTheme();

  return (
    <>
      {data === undefined ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fafafa',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : data === '' ? (
        <></>
      ) : (
        <ScrollView
          style={[{flex: 1}, {backgroundColor: background}]}
          contentContainerStyle={[{padding: 4}, {paddingTop: 0}]}>
          <Appbar.Header
            style={{
              backgroundColor: '#fff',
            }}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title={data.name.trim()}
              style={{
                alignItems: 'center',
              }}
            />
            <Appbar.Action />
          </Appbar.Header>
          <Card style={{margin: 4}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => toggleModal(data.image)}>
              <Card.Cover source={{uri: data.image}} />
            </TouchableOpacity>
            <Card.Title title={data.name.trim()} />
            <Card.Content>
              <Paragraph>{data.category}</Paragraph>
              <Paragraph>{data.restdetail}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={{margin: 4}}>
            <Card.Actions style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1, alignItems: 'center'}}>
                <View>
                  <Icon name="favorite-border" size={28} color="black" />
                </View>
                <View>
                  <Text>좋아요</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1, alignItems: 'center'}}>
                <View>
                  <Icon name="phone" size={28} color="black" />
                </View>
                <View>
                  <Text>전화</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1, alignItems: 'center'}}
                onPress={() =>
                  GetCurrentLocation().then(() =>
                    navigation.navigate('LoadNavi', {
                      destination: route.params.destination,
                    }),
                  )
                }>
                <View>
                  <Icon name="map" size={28} color="black" />
                </View>
                <View>
                  <Text>길찾기</Text>
                </View>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          <Card style={{margin: 4}}>
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
          <Card style={{margin: 4}}>
            <Card.Title title="메뉴" />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => toggleModal(data.menuImage)}>
              <Card.Cover source={{uri: data.menuImage}} />
            </TouchableOpacity>
            <List.Accordion title="메뉴 보기" titleStyle={{color: 'black'}}>
              <Divider />
              {JSON.parse(data.menu).map((item: string) => (
                <View key={JSON.stringify(item)}>
                  <List.Item title={item} />
                  <Divider />
                </View>
              ))}
            </List.Accordion>
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
              style={{flex: 1, backgroundColor: '#fff'}}>
              <Icon name="close" size={28} color="black" />
              <View>
                <Image
                  source={{
                    uri: `${modalImage}`,
                  }}
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
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
