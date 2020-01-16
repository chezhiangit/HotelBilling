import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
// import {ShortToast} from '../Utils/Toast';
import {deviceFactor} from '../Utils/resolution';
import {SearchBar} from '../Components/UIComponents/SearchBar';
import ItemListComponent from '../Components/UIComponents/ItemList';
import OrdersListComponent from '../Components/UIComponents/OrderListComponents/OrderList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {saveTableNumber, clearAllOrderedItems} from '../Actions/FoodActions';
import OpenOrderDialogComponent from '../Components/UIComponents/OpenOrderDialogComponent';
import ListHeaderComponent from '../Components/UIComponents/OrderListComponents/ListHeaderComponent';
import ListFooterComponent from '../Components/UIComponents/OrderListComponents/ListFooterComponent';

const DATA = [
  {
    itemCode: 100,
    itemName: 'Idly',
    price: 100.75,
    qty: 1,
  },
  {
    itemCode: 101,
    itemName: 'Dosa',
    price: 200.25,
    qty: 1,
  },
  {
    itemCode: 102,
    itemName: 'Vada',
    price: 300.5,
    qty: 1,
  },
  {
    itemCode: 103,
    itemName: 'Poori',
    price: 400.0,
    qty: 1,
  },
  {
    itemCode: 104,
    itemName: 'Pongal',
    price: 500.8,
    qty: 1,
  },
  {
    itemCode: 105,
    itemName: 'Tea',
    price: 300.4,
    qty: 1,
  },
  {
    itemCode: 106,
    itemName: 'Coffee',
    price: 100.75,
    qty: 1,
  },
  {
    itemCode: 107,
    itemName: 'Pepsi',
    price: 200.25,
    qty: 1,
  },
  {
    itemCode: 108,
    itemName: 'Rotti',
    price: 300.5,
    qty: 1,
  },
  {
    itemCode: 109,
    itemName: 'Parotta',
    price: 400.0,
    qty: 1,
  },
  {
    itemCode: 110,
    itemName: 'Lemon Rice',
    price: 500.8,
    qty: 1,
  },
  {
    itemCode: 111,
    itemName: 'Full meals',
    price: 300.4,
    qty: 1,
  },
];

class FoodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewOrder: false,
      showEditOrder: false,
      tableNo: '',
      totalAmount: 0,
    };
    // this.totalAmount = 0;
  }

  onNewOrder = () => {
    this.setState({showNewOrder: true, dlgTitle: 'New Order'});
  };

  onEditOrder = () => {
    this.setState({showEditOrder: true, dlgTitle: 'Edit Order'});
  };

  onDlgDone = tableNo => {
    // console.log('table No: ', tableNo);
    if (tableNo !== undefined && tableNo !== '') {
      this.setState({
        showEditOrder: false,
        showNewOrder: false,
        tableNo,
        totalAmount: 0,
      });
      this.props.saveTableNumber(tableNo);
    } else {
      // ShortToast('Pleas enter table number!');
    }
  };

  onDlgCancel = () => {
    this.setState({
      showEditOrder: false,
      showNewOrder: false,
    });
  };

  onClearAllOrderedItems = () => {
    this.props.clearAllOrderedItems(this.props.tableNo);
  };

  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps', props);
    if (props.orders?.length > 0) {
      let total = 0;
      let x = null;
      for (x of props.orders) {
        total = total + x.price;
      }
      // console.log('getDerivedStateFromProps ....total', total);
      return {totalAmount: total};
    }
    return {};
  }

  render() {
    // console.log('food page navigation state....', this.props.navigation.state);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <SearchBar />
          <ItemListComponent items={DATA} onNoTableNumber={this.onNewOrder} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.orderTitleContainer}>
            <TouchableOpacity onPress={this.onNewOrder}>
              <Text style={styles.newOrderText}>New Order</Text>
            </TouchableOpacity>
            <View style={styles.ordersTitle}>
              <Text style={styles.orderTitleText}>Orders</Text>
            </View>
            <TouchableOpacity onPress={this.onEditOrder}>
              <Text style={styles.editOrderText}>Edit Order</Text>
            </TouchableOpacity>
          </View>
          <ListHeaderComponent
            onClearAllOrderedItems={this.onClearAllOrderedItems}
          />
          <OrdersListComponent items={this.props.orders} />
          <ListFooterComponent totalAmount={this.state.totalAmount} />
        </View>
        <OpenOrderDialogComponent
          onDlgDone={this.onDlgDone}
          onDlgCancel={this.onDlgCancel}
          dlgTitle={this.state.dlgTitle}
          isDialogVisible={this.state.showNewOrder || this.state.showEditOrder}
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
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: '40%',
    height: '100%',
    // margin: '1%',
    borderColor: 'blue',
    borderWidth: 1,
    // alignItems: 'center',
    paddingLeft: deviceFactor(5),
  },
  orderTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ordersTitle: {
    width: deviceFactor(100),
    height: deviceFactor(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTitleText: {
    fontSize: deviceFactor(20),
    color: '#ff8000',
  },
  newOrderText: {
    fontSize: deviceFactor(10),
    color: '#ff8000',
  },
  editOrderText: {
    fontSize: deviceFactor(10),
    color: '#ff8000',
  },
});

const mapDispatchToProps = dispatch => ({
  // saveOrder: dispatch(saveOrder()),
  saveTableNumber: tableNo => dispatch(saveTableNumber(tableNo)),
  clearAllOrderedItems: tableNo => dispatch(clearAllOrderedItems(tableNo)),
});
const mapStateToProps = state => {
  console.log('state from foodpage', state);
  return {
    orders: state.food[state.food.tableNo],
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodPage);
