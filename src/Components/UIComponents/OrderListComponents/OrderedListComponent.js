import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {deviceFactor} from '../../../Utils/resolution';
// import Colors from '../../Utils/colors';
import {deleteOrderedItem} from '../../../Actions/FoodActions';
import ListSeparatorComponent from './ListSeparatorComponent';

class OrderedListComponent extends Component {
  constructor(props) {
    super(props);
  }

  onItemSelected = item => {
    this.props.editOrderedItem(item);
  };

  onItemDeleted = index => {
    this.props.deleteOrderedItem(index);
  };

  renderItems = ({item, index}) => {
    return (
      <View
        style={[
          styles.itemContainer,
          this.props.itemrowWidth && {width: this.props.itemrowWidth},
        ]}>
        <TouchableOpacity
          onPress={() => this.props.deleteRow && this.onItemSelected(item)}>
          <View
            style={[
              styles.item,
              this.props.itemrowWidth && {width: this.props.itemrowWidth},
            ]}>
            <View style={styles.count}>
              <Text
                style={[
                  styles.text,
                  this.props.textSize && {fontSize: this.props.textSize},
                ]}>
                {index}
              </Text>
            </View>
            <View
              style={[
                styles.itemName,
                this.props.itemNameWidth && {width: this.props.itemNameWidth},
              ]}>
              <Text
                style={[
                  styles.text,
                  this.props.textSize && {fontSize: this.props.textSize},
                ]}
                numberOfLines={2}>
                {item.itemName}
              </Text>
            </View>
            <View style={styles.qty}>
              <Text
                style={[
                  styles.text,
                  this.props.textSize && {fontSize: this.props.textSize},
                ]}>
                {item.qty}
              </Text>
            </View>
            <Text
              style={[
                styles.price,
                this.props.priceWidth && {width: this.props.priceWidth},
                this.props.textSize && {fontSize: this.props.textSize},
              ]}
              numberOfLines={1}>
              {parseFloat(item.price, 10) * parseInt(item.qty, 10)}
            </Text>
          </View>
        </TouchableOpacity>
        {this.props.deleteRow && (
          <TouchableOpacity
            style={styles.itemDelete}
            onPress={() => this.onItemDeleted(item.itemNo)}>
            <View>
              <Text>X</Text>
            </View>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
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
    borderColor: 'gray',
    borderLeftWidth: deviceFactor(2),
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    width: deviceFactor(170),
    height: deviceFactor(20),
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'gray',
    // borderRightWidth: deviceFactor(2),
    borderRadius: deviceFactor(1),
    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    fontSize: deviceFactor(10),
    color: '#696969',
  },
  count: {
    height: '100%',
    width: deviceFactor(15),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  itemName: {
    height: '100%',
    width: deviceFactor(100),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  qty: {
    height: '100%',
    width: deviceFactor(15),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
    // borderWidth: 1,
    // borderColor: 'red',
  },
  price: {
    height: '100%',
    width: deviceFactor(38),
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
    paddingRight: deviceFactor(2),
    // borderWidth: 1,
    // borderColor: 'red',
  },
  text: {
    color: '#696969',
    fontSize: deviceFactor(7),
  },
});

const mapDispatchToProps = dispatch => ({
  deleteOrderedItem: index => dispatch(deleteOrderedItem(index)),
});
export default connect(
  null,
  mapDispatchToProps,
)(OrderedListComponent);
