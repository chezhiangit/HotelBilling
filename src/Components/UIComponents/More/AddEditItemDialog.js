import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {deviceFactor} from '../../../Utils/resolution';

class AddEditItemDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemCode: '',
      itemName: '',
      itemPrice: '',
      itemDiscount: '',
      itemCGST: '',
      itemSGST: '',
    };
  }

  // static getDerivedStateFromProps(nextProps, state) {
  //   if (state.itemCode === '' && nextProps.isDialogVisible) {
  //     return {...nextProps.itemDetails};
  //   } else if (!nextProps.isDialogVisible) {
  //     return {itemCode: '', itemName: '', price: '', qty: ''};
  //   }
  //   return {};
  // }

  onDismissDlg = () => {
    // console.log('onDismiss ...');
    // this.setState({
    //   itemCode: '',
    //   itemName: '',
    //   price: '',
    //   qty: '',
    // });
  };

  onDlgDone = () => {
    const itemDetails = {
      itemCode: this.state.itemCode,
      itemName: this.state.itemName,
      itemPrice: this.state.itemPrice,
      itemDiscount: this.state.itemDiscount,
      itemCGST: this.state.itemCGST,
      itemSGST: this.state.itemSGST,
    };
    this.props.onDlgDone(itemDetails);
  };

  onTextChange = text => {
    this.setState({qty: text});
  };

  render() {
    return (
      <Dialog
        onDismiss={this.onDismissDlg}
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
              onPress={() => this.onDlgDone()}
            />
          </DialogFooter>
        }
        visible={this.props.isDialogVisible}>
        <DialogContent style={styles.dialogContent}>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>Item Code:</Text>
            <TextInput
              onChangeText={text => this.onCodeChange(text)}
              placeholder={'Enter item code'}
              style={styles.textInput}
              maxLength={100}
              value={this.state.itemCode}
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>Item Name:</Text>
            <TextInput
              onChangeText={text => this.onNameChange(text)}
              placeholder={'Enter item name'}
              style={styles.textInput}
              maxLength={100}
              value={this.state.itemName}
            />
          </View>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>Item price:</Text>
            <TextInput
              onChangeText={text => this.onPriceChange(text)}
              placeholder={'Enter item price'}
              style={styles.textInput}
              maxLength={5}
              value={this.state.itemPrice}
            />
          </View>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>Discount:</Text>
            <TextInput
              onChangeText={text => this.onDiscountChange(text)}
              placeholder={'Enter discount'}
              style={styles.textInput}
              autoFocus={true}
              maxLength={5}
              value={this.state.itemDiscount}
            />
          </View>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>CGST :</Text>
            <TextInput
              onChangeText={text => this.onCGSTChange(text)}
              placeholder={'Enter CGST'}
              style={styles.textInput}
              autoFocus={true}
              maxLength={5}
              value={this.state.itemCGST}
            />
          </View>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>SGST :</Text>
            <TextInput
              onChangeText={text => this.onSGSTChange(text)}
              placeholder={'Enter SGST'}
              style={styles.textInput}
              autoFocus={true}
              maxLength={5}
              value={this.state.itemSGST}
            />
          </View>
          <View style={styles.dlgRow}>
            <Text style={styles.label}>HSN :</Text>
            <TextInput
              onChangeText={text => this.onHSNChange(text)}
              placeholder={'Enter HSN'}
              style={styles.textInput}
              autoFocus={true}
              maxLength={5}
              value={this.state.itemSGST}
            />
          </View>
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
    margin: deviceFactor(10),
    width: deviceFactor(300),
  },
  container: {
    // flexDirection: 'row',
    // width: deviceFactor(200),
    // height: deviceFactor(30),
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red', //'#006600',
    // justifyContent: 'center',
  },
  textInput: {
    fontSize: deviceFactor(12),
    color: '#737373',
    borderBottomWidth: 1,
    borderBottomColor: '#737373',
    width: deviceFactor(150),
  },
  label: {
    fontSize: deviceFactor(12),
    margin: deviceFactor(5),
    width: deviceFactor(100),
    // height: deviceFactor(30),
  },
  dlgRow: {
    flexDirection: 'row',
    height: deviceFactor(30),
    // borderBottomWidth: 1,
    // width: deviceFactor(300),
  },
});

export default AddEditItemDialog;
