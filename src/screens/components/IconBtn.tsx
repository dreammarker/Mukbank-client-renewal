import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = React.ComponentProps<typeof TouchableOpacity> &
  React.ComponentProps<typeof Icon> & {
    iconName: string;
    iconTitle: string;
    onPressEvent: () => void;
  };

const IconBtn = ({color, iconName, iconTitle, onPressEvent}: Props) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.icon}
    onPress={() => onPressEvent()}>
    <View>
      <Icon name={iconName} size={28} color={color} />
    </View>
    <View>
      <Text>{iconTitle}</Text>
    </View>
  </TouchableOpacity>
);

export default IconBtn;

const styles = StyleSheet.create({
  icon: {flex: 1, alignItems: 'center'},
});
