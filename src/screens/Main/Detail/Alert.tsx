import React from 'react';
import {Dialog, Button, Paragraph} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './DetailStyles';

type NavigationProp = StackNavigationProp<MainStackNaviParamList>;

interface AlertProp {
  isDialogVisible: boolean;
  closeDialog: () => void;
  navigation: NavigationProp;
}

function Alert({isDialogVisible, closeDialog, navigation}: AlertProp) {
  return (
    <Dialog visible={isDialogVisible} onDismiss={() => closeDialog()}>
      <Dialog.Title>죄송합니다</Dialog.Title>
      <Dialog.Content style={styles.dialogContent}>
        <Paragraph>상세정보가 존재하지 않습니다.</Paragraph>
      </Dialog.Content>
      <Dialog.Actions style={styles.dialogActions}>
        <Button
          labelStyle={styles.alertBtn}
          onPress={() => navigation.goBack()}>
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default Alert;
