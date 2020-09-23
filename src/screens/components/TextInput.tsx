import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput as Input, HelperText} from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & {errorText?: string} & {
  visible: boolean;
};

const TextInput = ({visible, errorText, ...props}: Props) => (
  <View style={styles.container}>
    <Input underlineColor="transparent" mode="outlined" {...props} />
    <HelperText type="error" visible={visible}>
      {errorText}
    </HelperText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 1,
  },
});

export default memo(TextInput);
