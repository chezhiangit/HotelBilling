import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
// import {ShortToast} from '../Utils/Toast';
import {deviceFactor} from '../Utils/resolution';
import {SearchBar} from '../Components/UIComponents/SearchBar';
import ItemListComponent from '../Components/UIComponents/ItemList';
import OrderedListComponent from '../Components/UIComponents/OrderListComponents/OrderedListComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  saveTableNumber,
  clearAllOrderedItems,
  editOrderedItems,
  updatePaymentStatus,
} from '../Actions/FoodActions';
import CreateOrderDialogComponent from '../Components/UIComponents/CreateOrderDialogComponent';
import EditOrderedItemDialogComponent from '../Components/UIComponents/EditOrderedItemDialogComponent';
import ListHeaderComponent from '../Components/UIComponents/OrderListComponents/ListHeaderComponent';
import ListFooterComponent from '../Components/UIComponents/OrderListComponents/ListFooterComponent';
import FloatingButton from '../Components/UIComponents/FloatingButtons';
import PaymentDialog from '../Components/UIComponents/PaymentDialog';

const DATA = [
  {
    itemCode: '100',
    itemName: 'Idly',
    price: '100.75',
    qty: '1',
  },
  {
    itemCode: '101',
    itemName: 'Dosa',
    price: '200.25',
    qty: '1',
  },
  {
    itemCode: '102',
    itemName: 'Vada',
    price: '75.50',
    qty: '1',
  },
  {
    itemCode: '103',
    itemName: 'Poori',
    price: '150.00',
    qty: 1,
  },
  {
    itemCode: '104',
    itemName: 'Pongal',
    price: '105.00',
    qty: '1',
  },
  {
    itemCode: '105',
    itemName: 'Tea',
    price: '15',
    qty: '1',
  },
  {
    itemCode: '106',
    itemName: 'Coffee',
    price: '25',
    qty: '1',
  },
  {
    itemCode: '107',
    itemName: 'Pepsi',
    price: '30.50',
    qty: '1',
  },
  {
    itemCode: '108',
    itemName: 'Rotti',
    price: '50.50',
    qty: '1',
  },
  {
    itemCode: '109',
    itemName: 'Parotta',
    price: '40.00',
    qty: '1',
  },
  {
    itemCode: '110',
    itemName: 'Lemon Rice',
    price: '50.50',
    qty: '1',
  },
  {
    itemCode: '111',
    itemName: 'Full meals',
    price: '100.50',
    qty: '1',
  },
];

class FoodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewOrder: false,
      showEditOrder: false,
      // tableNo: '',
      totalAmount: 0,
      itemListData: [...DATA],
      showEditOrderedItemsDlg: false,
      paymentDlgVisible: false,
    };
    this.editedOrder = {};
  }

  onNewOrder = () => {
    this.setState({showNewOrder: true, dlgTitle: 'New Order'});
  };

  onEditOrder = () => {
    this.setState({showEditOrder: true, dlgTitle: 'Edit Order'});
  };

  onDlgDone = (tableNo, waiterCode) => {
    // console.log('table No: ', tableNo);
    if (tableNo !== undefined && tableNo !== '') {
      this.setState({
        showEditOrder: false,
        showNewOrder: false,
        // tableNo,
        totalAmount: 0,
        waiterCode,
      });
      this.props.saveTableNumber(tableNo, waiterCode);
    } else {
      // ShortToast('Pleas enter table number!');
    }
  };

  editOrderedItemDlgDone = itemDetails => {
    this.setState({showEditOrderedItemsDlg: false});
    this.editedOrder = {...itemDetails};
    this.props.editOrderedItems(this.editedOrder);
    this.editedOrder = {};
  };

  editOrderedItemDlgCancel = () => {
    this.setState({showEditOrderedItemsDlg: false});
    this.editedOrder = {};
  };

  onDlgCancel = () => {
    this.setState({
      showEditOrder: false,
      showNewOrder: false,
    });
  };

  onClearAllOrderedItems = () => {
    // console.log('current table number .... ', this.props.tableNo);

    if (this.props.tableNo !== '') {
      this.props.clearAllOrderedItems(this.props.tableNo);
    }
  };

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

  searchItems = searchText => {
    const itemList = DATA.filter((item, index) => {
      const reg = searchText; //'[' + searchText + ']';
      // console.log('regex ... ', reg);
      if (searchText.length > 0 && item.itemName.match(reg, 'gi')?.length > 0) {
        return {...item};
      }
      return null;
    });

    // console.log('searched items ....', itemList);

    if (itemList !== undefined && itemList !== null && itemList.length > 0) {
      // console.log('searched items found....', itemList);
      this.setState({itemListData: [...itemList]});
      return;
    }
    this.setState({itemListData: [...DATA]});
  };

  editOrderedItem = editedOrder => {
    this.editedOrder = {...editedOrder};
    // console.log('edited items....', editedOrder);
    this.setState({
      showEditOrderedItemsDlg: true,
      editItemdlgTitle: 'Edit Ordered Item',
    });
  };

  onBilling = () => {
    this.setState({paymentDlgVisible: true});
  };

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

  render() {
    // console.log('current table number .... ', this.props.tableNo);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <SearchBar searchItems={this.searchItems} />
          <ItemListComponent
            items={this.state.itemListData}
            onNoTableNumber={this.onNewOrder}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.orderTitleContainer}>
            <TouchableOpacity onPress={this.onNewOrder}>
              <Text style={styles.newOrderText}>Create order</Text>
            </TouchableOpacity>
            <View style={styles.ordersTitle}>
              <Text style={styles.orderTitleText}>
                Table No: {this.props.tableNo}
              </Text>
            </View>
            <TouchableOpacity onPress={this.onEditOrder}>
              <Text style={styles.editOrderText}>Open order</Text>
            </TouchableOpacity>
          </View>
          <ListHeaderComponent
            onClearAllOrderedItems={this.onClearAllOrderedItems}
            deleteRows={true}
          />
          <OrderedListComponent
            items={this.props.orders}
            editOrderedItem={this.editOrderedItem}
            deleteRow={true}
          />
          <ListFooterComponent totalAmount={this.state.totalAmount} />
        </View>
        <CreateOrderDialogComponent
          onDlgDone={this.onDlgDone}
          onDlgCancel={this.onDlgCancel}
          dlgTitle={this.state.dlgTitle}
          isDialogVisible={this.state.showNewOrder || this.state.showEditOrder}
        />
        <EditOrderedItemDialogComponent
          onDlgDone={this.editOrderedItemDlgDone}
          onDlgCancel={this.editOrderedItemDlgCancel}
          dlgTitle={this.state.editItemdlgTitle}
          isDialogVisible={this.state.showEditOrderedItemsDlg}
          itemDetails={this.editedOrder}
        />
        {this.state.totalAmount > 0 && (
          <FloatingButton onBilling={this.onBilling} />
        )}
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
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: deviceFactor(5),
  },
  leftContainer: {
    width: '60%',
    height: '100%',
    // margin: '1%',
    borderColor: 'gray',
    borderRightWidth: 2,
    alignItems: 'center',
  },
  rightContainer: {
    width: '40%',
    height: '100%',
    // margin: '1%',
    // borderColor: 'blue',
    // borderWidth: 1,
    // alignItems: 'center',
    // paddingLeft: deviceFactor(5),
    // paddingRight: deviceFactor(5),
  },
  orderTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  ordersTitle: {
    width: deviceFactor(100),
    height: deviceFactor(20),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  orderTitleText: {
    fontSize: deviceFactor(7),
    color: '#696969',
    fontWeight: 'bold',
  },
  newOrderText: {
    fontSize: deviceFactor(7),
    color: '#ff8000',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#696969',
    padding: 2,
  },
  editOrderText: {
    fontSize: deviceFactor(7),
    color: '#ff8000',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#696969',
    padding: 2,
  },
});

const mapDispatchToProps = dispatch => ({
  // saveOrder: dispatch(saveOrder()),
  saveTableNumber: (tableNo, waiterCode) =>
    dispatch(saveTableNumber(tableNo, waiterCode)),
  clearAllOrderedItems: tableNo => dispatch(clearAllOrderedItems(tableNo)),
  editOrderedItems: itemDetails => dispatch(editOrderedItems(itemDetails)),
  updatePaymentStatus: payment => dispatch(updatePaymentStatus(payment)),
});

const mapStateToProps = state => {
  // console.log('state from foodpage', state);
  return {
    orders: state.food[state.food.tableNo],
    waiterCode: state.food.waiterCode,
    cashierCode: state.food.chashierCode,
    tableNo: state.food.tableNo,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodPage);
