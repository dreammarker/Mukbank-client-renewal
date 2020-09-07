import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type Style = {
  subHeader: ViewStyle;
  sectionTitleView: ViewStyle;
  sectionTitle: TextStyle;
  refreshBtnView: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  subHeader: {
    marginBottom: '7%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleView: {position: 'relative', height: '100%'},
  sectionTitle: {fontSize: 16, color: 'black'},
  refreshBtnView: {
    position: 'relative',
    height: '100%',
    width: '15%',
    alignItems: 'center',
  },
});

export default styles;
