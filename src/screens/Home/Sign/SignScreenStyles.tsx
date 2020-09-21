import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

type Style = {
  background: ViewStyle;
  container: ViewStyle;
  image: ImageStyle;
  header: TextStyle;
  button: ViewStyle;
  text: TextStyle;
};

const styles = StyleSheet.create<Style>({
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: '50%',
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default styles;
