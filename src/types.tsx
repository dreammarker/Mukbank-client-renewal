import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

export type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;

export type UserInfo = {
  id: string;
  nickname: string;
  joined: string;
};

export type SearchListData = {
  address: string;
  distance: number;
  firstchild: string;
  id: number;
  image: string | null;
  latitude: string;
  longitude: string;
  name: string;
  parent: string;
  phone: string;
  roadAddress: string;
  secondchild: string;
};

export type DetailData = {
  name: string;
  image: string;
  restdetail: string;
  menuImage: string;
  option: string;
  longitude: string;
  menu: string;
  category: string;
  phone: string;
};

export type LikeListData = {
  address: string;
  firstchild: string;
  image: string | null;
  latitude: string;
  likecheck: number;
  longitude: string;
  name: string;
  parent: string;
  rest_id: number;
  secondchild: string;
  user_id: number;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type CheckText = {
  value: string;
  error: string | boolean;
};
