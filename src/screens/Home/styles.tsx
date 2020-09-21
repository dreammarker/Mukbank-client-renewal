import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type Style = {
  drawerContent: ViewStyle;
  logIn: ViewStyle;
  loginTitle: ViewStyle;
  userInfoSection: ViewStyle;
  title: TextStyle;
  row: ViewStyle;
  drawerSection: ViewStyle;
  drawerSectionMargin: ViewStyle;
  drawerItemTitle: TextStyle;
  drawerItemLabel: TextStyle;
};

const styles = StyleSheet.create<Style>({
  drawerContent: {
    flex: 1,
  },
  logIn: {
    paddingTop: 50,
  },
  loginTitle: {textAlign: 'center'},
  userInfoSection: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerSectionMargin: {marginLeft: 20},
  drawerItemTitle: {fontSize: 17},
  drawerItemLabel: {fontSize: 16, color: 'black'},
});

export default styles;
