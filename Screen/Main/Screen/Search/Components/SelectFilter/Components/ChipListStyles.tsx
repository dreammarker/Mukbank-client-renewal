import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  unSelectChips: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  unSelectChips: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default styles;
