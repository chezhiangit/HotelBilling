import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {deviceFactor} from '../../../Utils/resolution';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ListHeaderComponent(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.count, props.snWidth && {width: props.snWidth}]}>
        <Text
          style={[styles.text, props.textSize && {fontSize: props.textSize}]}>
          S.N
        </Text>
      </View>
      <View
        style={[
          styles.itemName,
          props.itemNameWidth && {width: props.itemNameWidth},
        ]}>
        <Text
          style={[styles.text, props.textSize && {fontSize: props.textSize}]}>
          Item Name
        </Text>
      </View>
      <View style={(styles.qty, props.qtyWidth && {width: props.qtyWidth})}>
        <Text
          style={[styles.text, props.textSize && {fontSize: props.textSize}]}>
          Qty
        </Text>
      </View>
      <View
        style={[styles.price, props.priceWidth && {width: props.priceWidth}]}>
        <Text
          style={[styles.text, props.textSize && {fontSize: props.textSize}]}>
          Price
        </Text>
      </View>
      {props.deleteRows && (
        <TouchableOpacity onPress={props.onClearAllOrderedItems}>
          <View style={styles.clear}>
            <Text style={styles.text}>C</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: deviceFactor(20),
    width: '100%', // deviceFactor(190),
    // width: '100%',
    backgroundColor: '#F5F5F5',
    borderColor: 'gray',
    borderBottomWidth: deviceFactor(2),
    marginBottom: deviceFactor(1),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
  },
  count: {
    height: '100%',
    width: deviceFactor(15),
    alignItems: 'flex-start',
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
    // borderColor: 'red',
  },
  price: {
    height: '100%',
    width: deviceFactor(38),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: deviceFactor(2),
    // borderWidth: 1,
    // borderColor: 'red',
  },
  text: {
    color: '#696969',
    fontSize: deviceFactor(7),
    fontWeight: 'bold',
  },
  clear: {
    width: deviceFactor(22),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc0303',
    borderRadius: deviceFactor(1),
    borderColor: 'gray',
    borderLeftWidth: deviceFactor(2),
  },
});
