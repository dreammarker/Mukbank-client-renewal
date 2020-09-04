import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  noneResult: ViewStyle;
  noneResultText: TextStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  noneResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noneResultText: {fontSize: 15},
});

export default styles;
