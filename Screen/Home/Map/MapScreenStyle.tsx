import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

type Style = {
  map: ViewStyle;
  radius: ViewStyle;
  marker: ViewStyle;
  container: ViewStyle;
  gpsBtn: ImageStyle;
  searchBar: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,112,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 18,
    width: 18,
    borderWidth: 3,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    borderColor: 'white',
  },
  searchBar: {
    top: '5%',
    left: '2%',
    right: '2%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  gpsBtn: {
    margin: 2,
    marginTop: 13,
    padding: 6,
    width: 35,
    height: 35,
  },
});

export default styles;
