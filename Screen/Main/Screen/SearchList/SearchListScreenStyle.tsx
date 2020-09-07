import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  noneResult: ViewStyle;
  noneResultText: TextStyle;
  flatListContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  noneResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  noneResultText: {fontSize: 15},
  flatListContainer: {
    margin: '5.5%',
  },
});

export default styles;
