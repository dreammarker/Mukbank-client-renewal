import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  chips: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  chips: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default styles;
