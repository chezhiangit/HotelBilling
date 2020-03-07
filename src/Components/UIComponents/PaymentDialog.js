import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {deviceFactor} from '../../Utils/resolution';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import moment from 'moment';

const paymentTypes = {
  '1': 'Cash',
  '2': 'Debit Card',
  '3': 'Credit Card',
  '4': 'Pending',
};

class PaymentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tableNo: '',
      // amount: '',
      paymentType: '',
      date: new Date(),
      discount: 0,
      selectedRadioBtn: 1,
      netAmount: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isDialogVisible && state.netAmount === 0) {
      // console.log('state.amount 1', props.amount);
      return {netAmount: props.amount};
    }
    return {};
  }

  onTextChange = text => {
    this.setState({discount: text, netAmount: this.props.amount - text});
  };

  onRadioBtnSelected = index => {
    this.setState({selectedRadioBtn: index});
  };

  render() {
    // console.log('this.state.netAmount', this.state.netAmount);
    const netAmount = this.props.amount - this.state.discount;
    return (
      <Dialog
        onDismiss={() => this.setState({discount: 0, netAmount: 0})}
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
              text="PAY"
              onPress={() => {
                this.props.onDlgDone({
                  tableNo: this.props.tableNo,
                  totalAmount: this.props.amount,
                  discount: this.state.discount,
                  netAmount: this.state.netAmount,
                  paymentType: paymentTypes[this.state.selectedRadioBtn],
                  paymentDate: moment().format('MMM-DD-YYYY'),
                });

              }}
            />
          </DialogFooter>
        }
        visible={this.props.isDialogVisible}>
        <DialogContent style={styles.dialogContent}>
          <View>
            <View style={styles.outerRow}>
              <View style={styles.topRow}>
                <Text style={styles.labeltext}>Table No:</Text>
                <Text style={styles.valuetext}>{this.props.tableNo}</Text>
              </View>
              <View style={styles.topRow}>
                <Text style={styles.labeltext}>Total Amount:</Text>
                <Text style={styles.valuetext}>{this.props.amount}</Text>
              </View>
            </View>
            <View style={styles.outerRow}>
              <Text style={styles.labeltext}>Discount:</Text>
              <TextInput
                onChangeText={text => this.onTextChange(text)}
                placeholder={''}
                style={[
                  styles.valuetext,
                  {borderColor: 'gray', borderBottomWidth: 1},
                ]}
                value={'' + this.state.discount}
                // autoFocus={true}
              />
            </View>
            <View style={styles.outerRow}>
              <Text style={styles.labeltext}>Net Amount: </Text>
              <Text style={styles.valuetext}>{netAmount}</Text>
            </View>
            <View style={styles.outerRow}>
              <TouchableWithoutFeedback
                onPress={() => this.onRadioBtnSelected(1)}>
                <View style={styles.paymentTypeRow}>
                  <View
                    style={[
                      styles.radioBtn,
                      this.state.selectedRadioBtn === 1 && {
                        backgroundColor: 'red',
                      },
                    ]}
                  />
                  <Text style={styles.labeltext}>Cash</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* <View style={styles.paymentTypeRow}> */}
              <TouchableWithoutFeedback
                style={styles.paymentTypeRow}
                onPress={() => this.onRadioBtnSelected(2)}>
                <View
                  style={[
                    styles.radioBtn,
                    this.state.selectedRadioBtn === 2 && {
                      backgroundColor: 'red',
                    },
                  ]}
                />
                <Text style={styles.labeltext}>Debit Card</Text>
              </TouchableWithoutFeedback>
              {/* </View> */}
            </View>
            <View style={styles.outerRow}>
              {/* <View style={styles.paymentTypeRow}> */}
              <TouchableWithoutFeedback
                style={styles.paymentTypeRow}
                onPress={() => this.onRadioBtnSelected(3)}>
                <View
                  style={[
                    styles.radioBtn,
                    this.state.selectedRadioBtn === 3 && {
                      backgroundColor: 'red',
                    },
                  ]}
                />
                <Text style={styles.labeltext}>Credit Card</Text>
              </TouchableWithoutFeedback>
              {/* </View> */}
              {/* <View style={styles.paymentTypeRow}> */}
              <TouchableWithoutFeedback
                style={styles.paymentTypeRow}
                onPress={() => this.onRadioBtnSelected(4)}>
                <View
                  style={[
                    styles.radioBtn,
                    this.state.selectedRadioBtn === 4 && {
                      backgroundColor: 'red',
                    },
                  ]}
                />
                <Text style={styles.labeltext}>Pending</Text>
              </TouchableWithoutFeedback>
              {/* </View> */}
            </View>
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
    height: deviceFactor(35),
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    // width: deviceFactor(350),
    height: deviceFactor(250),
    // borderWidth: 1,
    // borderColor: 'red',
  },
  topRow: {
    flexDirection: 'row',
    // width: '100%',
    height: deviceFactor(30),
    alignItems: 'center',
    // justifyContent: 'flex-start',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  //   outerRow: {
  //     flexDirection: 'row',
  //     // height: deviceFactor(20),
  //     marginTop: deviceFactor(20),
  //     width: deviceFactor(200),
  //   },
  radioBtn: {
    width: deviceFactor(10),
    height: deviceFactor(10),
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
    margin: deviceFactor(5),
  },
  labeltext: {
    fontSize: deviceFactor(12),
    color: '#737373',
    fontWeight: 'bold',
    paddingRight: deviceFactor(5),
    // width: deviceFactor(80),
  },
  valuetext: {
    fontSize: deviceFactor(12),
    color: '#737373',
    fontWeight: 'bold',
    // paddingRight: deviceFactor(5),
    width: deviceFactor(100),
  },
  textInput: {
    fontSize: deviceFactor(12),
    color: '#737373',
    height: '100%',
    width: deviceFactor(100),
    borderWidth: 1,
    // borderColor: 'red',
    // fontWeight: 'bold',
  },
  outerRow: {
    flexDirection: 'row',
    fontSize: deviceFactor(12),
    color: '#737373',
    fontWeight: 'bold',
    // paddingRight: deviceFactor(5),
    // width: deviceFactor(200),
    marginTop: deviceFactor(20),
  },
  paymentTypeRow: {
    flexDirection: 'row',
    height: deviceFactor(20),
    width: deviceFactor(100),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default PaymentDialog;
