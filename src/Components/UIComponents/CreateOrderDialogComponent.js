import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {deviceFactor} from '../../Utils/resolution';

class CreateOrderDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableNo: '',
    };
  }

  onTextChange = text => {
    this.setState({tableNo: text});
  };

  render() {
    // console.log('this.props ...', this.props);
    return (
      <Dialog
        onDismiss={() => this.setState({tableNo: ''})}
        dialogTitle={
          <DialogTitle
            style={styles.dialogTitle}
            textStyle={styles.titleTextStyle}
            hasTitleBar={true}
            title={this.props.dlgTitle}
          />
        }
        footer={
          <DialogFooter style={styles.dialogFooter} bordered={true}>
            <DialogButton
              style={styles.cancelButton}
              textStyle={styles.buttonText}
              text="CANCEL"
              onPress={() => this.props.onDlgCancel()}
            />
            <DialogButton
              style={styles.doneButton}
              textStyle={styles.buttonText}
              text="DONE"
              onPress={() => this.props.onDlgDone(this.state.tableNo)}
            />
          </DialogFooter>
        }
        visible={this.props.isDialogVisible}>
        <DialogContent style={styles.dialogContent}>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => this.onTextChange(text)}
              placeholder={'Enter table number'}
              style={styles.text}
              autoFocus={true}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => this.onTextChange(text)}
              placeholder={'Enter waiter number'}
              style={styles.text}
              autoFocus={true}
            />
          </View>
          {/* <View style={{flexDirection: 'row',height:deviceFactor(10)}}>
            <View
              style={{
                heig: deviceFactor(10),
                width: deviceFactor(10),
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 100,
                marginRight: deviceFactor(5),
              }}
            />
            <Text style={{marginRight: deviceFactor(5)}}>KOT receipt</Text>
            <View
              style={{
                heig: deviceFactor(10),
                width: deviceFactor(10),
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 100,
                marginRight: deviceFactor(5),
              }}
            />
            <Text style={{marginRight: deviceFactor(5)}}>Billing</Text>
          </View> */}
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  dislogStyles: {
    // margin: deviceFactor(10),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dialogTitle: {
    height: deviceFactor(30),
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#006600',
    // marginBottom: deviceFactor(20),
  },
  titleTextStyle: {
    fontSize: deviceFactor(15),
    color: '#006600',
  },
  cancelButton: {
    backgroundColor: '#B0B0B0',
  },
  doneButton: {
    backgroundColor: '#006600',
  },
  buttonText: {
    fontSize: deviceFactor(10),
    color: '#ffffff',
  },
  dialogFooter: {
    borderTopWidth: 1,
    borderTopColor: '#006600',
  },
  dialogContent: {
    margin: deviceFactor(30),
  },
  container: {
    // flexDirection: 'row',
    width: deviceFactor(200),
    height: deviceFactor(30),
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#006600',
    justifyContent: 'center',
    marginBottom: deviceFactor(5),
  },
  text: {
    fontSize: deviceFactor(12),
    color: '#737373',
  },
});

export default CreateOrderDialogComponent;
