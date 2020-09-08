import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  selectedChip: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  selectedChip: {
    margin: 4,
  },
});

export default styles;
