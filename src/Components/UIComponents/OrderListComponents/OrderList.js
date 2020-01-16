import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {deviceFactor} from '../../../Utils/resolution';
// import Colors from '../../Utils/colors';
import {deleteOrderedItem} from '../../../Actions/FoodActions';
import ListSeparatorComponent from './ListSeparatorComponent';

class OrdersListComponent extends Component {
  constructor(props) {
    super(props);
  }

  onItemSelected = item => {
    // this.props.saveOrder(item);
  };

  onItemDeleted = index => {
    this.props.deleteOrderedItem(index);
  };

  renderItems = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => this.onItemSelected(item)}>
          <View style={styles.item}>
            <Text style={styles.count}>{index}</Text>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.itemName}
            </Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.price} numberOfLines={1}>
              {item.price}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemDelete}
          onPress={() => this.onItemDeleted(item.itemNo)}>
          <View>
            <Text>X</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.items}
        renderItem={this.renderItems}
        keyExtractor={item => item.itemNo}
        numColumns={1}
        ItemSeparatorComponent={() => <ListSeparatorComponent />}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: deviceFactor(20),
    flexDirection: 'row',
  },
  itemDelete: {
    width: deviceFactor(20),
    height: deviceFactor(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc0303',
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderRadius: deviceFactor(1),
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    width: deviceFactor(170),
    height: deviceFactor(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderRightWidth: deviceFactor(2),
    borderRadius: deviceFactor(1),
  },
  title: {
    fontSize: deviceFactor(10),
    color: '#696969',
  },
  count: {
    // height: '100%',
    width: deviceFactor(15),
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'gray',
  },
  itemName: {
    // height: '100%',
    width: deviceFactor(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    // height: '100%',
    width: deviceFactor(15),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  price: {
    // height: '100%',
    width: deviceFactor(38),
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    textAlign: 'right',
    paddingRight: deviceFactor(2),
  },
});

const mapDispatchToProps = dispatch => ({
  deleteOrderedItem: index => dispatch(deleteOrderedItem(index)),
});
export default connect(
  null,
  mapDispatchToProps,
)(OrdersListComponent);
