import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  selectedChipView: ViewStyle;
  chipView: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  selectedChipView: {
    top: '3%',
  },
  chipView: {
    margin: '5%',
    flexWrap: 'wrap',
  },
});

export default styles;
