import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  searchBar: ViewStyle;
  filterView: ViewStyle;
  selectedChipView: ViewStyle;
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
  selectedChipView: {
    top: '3%',
  },
  filterView: {top: '10%'},
});

export default styles;
