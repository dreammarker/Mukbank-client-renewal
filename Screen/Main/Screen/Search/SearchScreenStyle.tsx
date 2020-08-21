import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  searchBar: ViewStyle;
  chipView: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  searchBar: {
    top: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  chipView: {
    margin: '5%',
    flexWrap: 'wrap',
  },
});

export default styles;
