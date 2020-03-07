import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import I18n from '../locales/i18n';
import {deviceFactor} from '../Utils/resolution';
import {
  updatePaymentStatus,
} from '../Actions/FoodActions';
import OrderedListComponent from '../Components/UIComponents/OrderListComponents/OrderedListComponent';
import ListHeaderComponent from '../Components/UIComponents/OrderListComponents/ListHeaderComponent';
import ListFooterComponent from '../Components/UIComponents/OrderListComponents/ListFooterComponent';
import PendingBillsList from '../Components/UIComponents/BillingComponents/PendingBillsList';
import FloatingButton from '../Components/UIComponents/FloatingButtons';
import PaymentDialog from '../Components/UIComponents/PaymentDialog';

class BillingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
      paymentDlgVisible: false,
    };
  }
  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps', props);
    let total = 0;
    if (props.orders?.length > 0) {
      let x = null;
      for (x of props.orders) {
        total = total + x.price * x.qty;
      }
      // console.log('getDerivedStateFromProps ....total', total);
      return {totalAmount: total};
    } else {
      return {totalAmount: 0};
    }
  }

  onPaymentDlgCancel = () => {
    this.setState({paymentDlgVisible: false});
  };

  onPaymentDlgDone = payment => {
    // console.log('Payment details...', payment);
    this.setState({paymentDlgVisible: false});
    const payments = {
      waiterName: 'Tester', //action.serverName,
      cashierName: 'Casher',
      cashierCode: '999',
      paymentStatus: payment.paymentType === 'Pending' ? 'Pending' : 'Paid',
      paymentType: payment.paymentType,
      discount: payment.discount,
      amountPaid: payment.netAmount,
      totalAmount: payment.totalAmount,
      paymentDate: payment.paymentDate,
    };

    this.props.updatePaymentStatus(payments);
  };

  onBilling = () => {
    this.setState({paymentDlgVisible: true});
  };

  render() {
    return (
      <View style={styles.maintainer}>
        <View style={styles.billView}>
          <ListHeaderComponent
            deleteRows={false}
            itemNameWidth={deviceFactor(245)}
            priceWidth={deviceFactor(70)}
            textSize={deviceFactor(12)}
            qtyWidth={deviceFactor(20)}
            snWidth={deviceFactor(20)}
          />
          <OrderedListComponent
            items={this.props.orders}
            editOrderedItem={this.editOrderedItem}
            deleteRow={false}
            itemNameWidth={deviceFactor(250)}
            priceWidth={deviceFactor(75)}
            itemrowWidth={deviceFactor(357)}
            textSize={deviceFactor(12)}
            qtyWidth={deviceFactor(20)}
            snWidth={deviceFactor(20)}
          />
          <ListFooterComponent
            totalAmount={this.state.totalAmount}
            footerContainerWidth={deviceFactor(357)}
          />
        </View>
        <View style={styles.pendingBillListView}>
          <View style={styles.pndingBillListContainer}>
            <Text style={styles.text}>Pending bills</Text>
          </View>
          <PendingBillsList />
        </View>
        <FloatingButton onBilling={this.onBilling} />

        <PaymentDialog
          dlgTitle={'Payment'}
          isDialogVisible={this.state.paymentDlgVisible}
          onDlgDone={this.onPaymentDlgDone}
          onDlgCancel={this.onPaymentDlgCancel}
          tableNo={this.props.tableNo}
          amount={this.state.totalAmount}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maintainer: {
    flex: 1,
    flexDirection: 'row',
  },
  billView: {
    width: '70%',
    borderRightWidth: deviceFactor(2),
    borderRightColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  pendingBillListView: {
    width: '30%',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  headerTitle: {
    // flex: 1,
    height: deviceFactor(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  headerTitleText: {
    color: 'rgb(95,141,207)',
    fontSize: deviceFactor(12),
    fontWeight: '700',
    letterSpacing: deviceFactor(10),
    // lineHeight: deviceFactor(10),
    // fontFamily:
  },
  hotelName: {
    height: deviceFactor(20),
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: deviceFactor(20),
  },
  hotelNameText: {
    color: 'rgb(95,141,207)',
    fontSize: deviceFactor(12),
    fontWeight: '700',
    // margin: deviceFactor(20),
  },
  address: {
    fontSize: deviceFactor(10),
    color: 'gray',
  },
  mobile: {
    marginTop: deviceFactor(10),
  },
  pndingBillListContainer: {
    // flexDirection: 'row',
    height: deviceFactor(20),
    // width: '100%', // deviceFactor(190),
    // width: '100%',
    backgroundColor: '#F5F5F5',
    borderColor: 'gray',
    borderBottomWidth: deviceFactor(2),
    // marginBottom: deviceFactor(1),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
  },
  text: {
    color: '#696969',
    fontSize: deviceFactor(12),
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = dispatch => ({
  updatePaymentStatus: payment => dispatch(updatePaymentStatus(payment)),
});

const mapStateToProps = state => {
  // console.log('state from foodpage', state);
  return {
    orders: state.food[state.food.tableNo],
    tableNo: state.food.tableNo,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingPage);
