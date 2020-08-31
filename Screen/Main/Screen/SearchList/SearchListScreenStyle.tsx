import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  container: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
});

export default styles;
