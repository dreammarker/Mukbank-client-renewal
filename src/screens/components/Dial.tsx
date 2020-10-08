import React, {memo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Paragraph, Button} from 'react-native-paper';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<HomeDrawerNaviParamList>,
  StackNavigationProp<MainStackNaviParamList>
>;

type Props = React.ComponentProps<typeof Dialog> & {
  title: string;
  paragraph: string;
  Navi: any;
  navigation: Navigation;
};

function Dial({title, Navi, paragraph, navigation}: Props) {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(true);

  const closeDialog = () => {
    setIsDialogVisible(false);
    if (Navi) {
      navigation.navigate(Navi);
    } else {
      navigation.goBack();
    }
  };
  return (
    <Dialog visible={isDialogVisible} onDismiss={() => closeDialog()}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content style={styles.dialogContent}>
        <Paragraph>{paragraph}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions style={styles.dialogActions}>
        {Navi ? (
          <Button
            labelStyle={styles.alertBtn}
            onPress={() => navigation.navigate(Navi)}>
            OK
          </Button>
        ) : (
          <Button
            labelStyle={styles.alertBtn}
            onPress={() => navigation.goBack()}>
            OK
          </Button>
        )}
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  error: {alignSelf: 'flex-start'},
  dialogContent: {paddingBottom: 0},
  dialogActions: {width: '95%'},
  alertBtn: {fontSize: 15},
});

export default memo(Dial);
