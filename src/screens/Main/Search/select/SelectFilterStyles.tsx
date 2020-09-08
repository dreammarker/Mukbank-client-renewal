import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type Style = {
  selectedChipView: ViewStyle;
  selectedChip: ViewStyle;
  selectedChipBtnView: ViewStyle;
  selectedChipBtn: ViewStyle;
  chipView: ViewStyle;
  chipListTitle: TextStyle;
  row: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  selectedChipView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '4%',
    marginRight: '4%',
  },
  selectedChip: {width: '80%'},
  selectedChipBtnView: {width: '20%'},
  selectedChipBtn: {},
  chipView: {
    flex: 16,
  },
  chipListTitle: {},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});

export default styles;
