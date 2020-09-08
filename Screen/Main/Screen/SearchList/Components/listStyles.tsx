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
  textView: ViewStyle;
  caDiView: ViewStyle;
  rightIcon: ViewStyle;
  listBtn: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  subHeader: {
    marginBottom: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleView: {position: 'relative', height: '100%'},
  sectionCard: {
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    height: 130,
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
    margin: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: '100%', width: '100%', resizeMode: 'cover'},
  avatar: {justifyContent: 'center', alignItems: 'center'},
  textView: {
    flex: 3,
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  caDiView: {flexDirection: 'row', marginBottom: '1.8%'},
  rightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBtn: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
  },
});

export default styles;
