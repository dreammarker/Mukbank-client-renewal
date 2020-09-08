import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

type Style = {
  subHeader: ViewStyle;
  sectionTitleView: ViewStyle;
  sectionCard: ViewStyle;
  sectionTitle: TextStyle;
  refreshBtnView: ViewStyle;
  imageView: ViewStyle;
  image: ImageStyle;
  avatar: ViewStyle;
  detailView: ViewStyle;
  detailFlex: ViewStyle;
  textFlex: ViewStyle;
  listName: TextStyle;
  listSecondChild: TextStyle;
  listDistance: TextStyle;
  caDiView: ViewStyle;
  rightIcon: ViewStyle;
  listBtnFlex: ViewStyle;
  listBtn: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  subHeader: {
    marginBottom: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleView: {position: 'relative', height: '100%'},
  sectionCard: {
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    height: 148,
  },
  sectionTitle: {fontSize: 17.5, color: 'black'},
  refreshBtnView: {
    position: 'relative',
    height: '100%',
    width: '15%',
    alignItems: 'center',
  },
  imageView: {
    flex: 1,
    margin: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  detailView: {
    flex: 3,
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  detailFlex: {
    flexDirection: 'row',
    height: '73%',
  },
  textFlex: {
    flex: 7,
  },
  listName: {fontSize: 16, marginBottom: '2%'},
  listSecondChild: {fontSize: 12.5, marginRight: '3%'},
  listDistance: {fontSize: 12.5, marginLeft: '3%'},
  caDiView: {flexDirection: 'row', marginBottom: '1.8%'},
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  listBtnFlex: {flex: 1},
  listBtn: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
  },
});

export default styles;
