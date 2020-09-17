import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

type Style = {
  container: ViewStyle;
  alertBtn: ViewStyle;
  dialogContent: ViewStyle;
  dialogActions: ViewStyle;
  containerContent: ViewStyle;
  header: ViewStyle;
  headerContent: ViewStyle;
  cardView: ViewStyle;
  cardActions: ViewStyle;
  icon: ViewStyle;
  accordion: ViewStyle;
  modal: ViewStyle;
  modalImage: ImageStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  alertBtn: {fontSize: 15},
  dialogContent: {paddingBottom: 0},
  dialogActions: {width: '95%'},
  containerContent: {
    paddingTop: 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
  },
  header: {backgroundColor: '#fff'},
  headerContent: {
    alignItems: 'center',
  },
  cardView: {margin: 4},
  cardActions: {flexDirection: 'row'},
  icon: {flex: 1, alignItems: 'center'},
  accordion: {color: 'black'},
  modal: {flex: 1, backgroundColor: '#fff'},
  modalImage: {width: '100%', height: '100%', resizeMode: 'contain'},
});

export default styles;
