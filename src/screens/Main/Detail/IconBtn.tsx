import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './DetailStyles';

interface IconBtnProp {
  onPressEvent: () => void;
  iconName: string;
  iconTitle: string;
}

function IconBtn({onPressEvent, iconName, iconTitle}: IconBtnProp) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.icon}
      onPress={() => onPressEvent()}>
      <View>
        <Icon name={iconName} size={28} color="black" />
      </View>
      <View>
        <Text>{iconTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default IconBtn;
