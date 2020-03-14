import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import I18n from '../locales/i18n';
import {deviceFactor} from '../Utils/resolution';
import ReportsComponent from '../Components/UIComponents/ReportsComponents/ReportsComponent';
import ReportsHeaderComponent from '../Components/UIComponents/ReportsComponents/ReportsHeaderComponent';
import ReportsFooterComponent from '../Components/UIComponents/ReportsComponents/ReportsFooterComponent';
import ReportsNameList from '../Components/UIComponents/ReportsComponents/ReportsNameList';
import FloatingButton from '../Components/UIComponents/FloatingButtons';

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
    };
  }
  static getDerivedStateFromProps(props, state) {
    let total = 0;
    if (props.bills?.length > 0) {
      let x = null;
      for (x of props.bills) {
        if (x.paymentStatus !== '') {
          total = total + x.amountPaid;
        }
      }
      return {totalAmount: total};
    } else {
      return {totalAmount: 0};
    }
  }

  render() {
    return (
      <View style={styles.maintainer}>
        <View style={styles.billView}>
          <ReportsHeaderComponent />
          <ReportsComponent />
          <ReportsFooterComponent totalAmount={this.state.totalAmount} />
        </View>
        <View style={styles.pendingBillListView}>
          <View style={styles.pndingBillListContainer}>
            <Text style={styles.text}>Reports</Text>
          </View>
          <ReportsNameList />
        </View>
        {/* <FloatingButton /> */}
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
    width: '80%',
    borderRightWidth: deviceFactor(2),
    borderRightColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  pendingBillListView: {
    width: '20%',
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
  //
});

const mapStateToProps = state => {
  console.log('state from foodpage', state);
  return {
    bills: state.food.pendingBills,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
