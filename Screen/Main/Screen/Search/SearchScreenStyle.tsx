import {StyleSheet, ViewStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  searchBarView: ViewStyle;
  searchBar: ViewStyle;
  filterChipsContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  searchBarView: {
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    top: '40%',
    marginLeft: '2%',
    marginRight: '2%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  filterChipsContainer: {
    flex: 7.5,
  },
});

export default styles;
