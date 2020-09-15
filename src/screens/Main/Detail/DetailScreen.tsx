import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {
  Paragraph,
  Card,
  useTheme,
  Appbar,
  List,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailScreen = () => {
  const data = {
    id: 34044,
    name: '카페자우 ',
    phone: '02-2283-2175',
    roadAddress: '서울 중구 장충단로13길 20 현대시티아울렛 동대문점 B1',
    clock: ' 매일  11:00~22:00 ',
    restdetail:
      '포르투갈어로 커피 재배지를 뜻하는 Cafezal(카페자우)에서는 최고급의 스페셜티 생두를 전문 로스터가 직접 로스팅하여 맛과 향이 풍부한 때에 추출하여 제공합니다. 핫트랙스의 카페브랜드 카페자우에서 특별하고 기분 좋은 시간을 보내시기 바랍니다.',
    image:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fldb.phinf.naver.net%2F20190823_10%2F15665669344498sKGE_JPEG%2FHYzYQqsXwnoHYEqQvY3zyrDQ.jpeg.jpg&type=f&size=175x150',
    menuImage:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fldb.phinf.naver.net%2F20200108_152%2F1578446506964g6HS7_JPEG%2FS7ppTM7YgHqf-_U-KrWQCzhS.jpg',
    option: '[" 주차 "," 포장 "," 남/녀 화장실 구분 "]',
    menu: '["4,000원 아메리카노 ","4,000원 에스프레소 ","4,500원 카페라떼 "]',
    category: '카페',
    rest_id: 7814,
    createdAt: '2020-03-29T12:16:51.000Z',
    updatedAt: '2020-03-29T12:16:51.000Z',
    deletedAt: null,
  };

  const {
    colors: {background},
  } = useTheme();

  return (
    <ScrollView
      style={[{flex: 1}, {backgroundColor: background}]}
      contentContainerStyle={{padding: 4}}>
      <Appbar.Header
        style={{
          backgroundColor: '#fff',
        }}>
        <Appbar.BackAction onPress={() => console.log('ss')} />
        <Appbar.Content
          title={data.name.trim()}
          style={{
            alignItems: 'center',
          }}
        />
        <Appbar.Action />
      </Appbar.Header>
      <Card style={{margin: 4}}>
        <Card.Cover source={{uri: data.image}} />
        <Card.Title title={data.name.trim()} />
        <Card.Content>
          <Paragraph>{data.category}</Paragraph>
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
            style={{flex: 1, alignItems: 'center'}}>
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
    </ScrollView>
  );
};

export default DetailScreen;
