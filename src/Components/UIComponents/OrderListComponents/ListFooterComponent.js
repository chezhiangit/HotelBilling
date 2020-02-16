import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {deviceFactor} from '../../../Utils/resolution';

const currencyRegx = /(\d)(?=(\d{2})+\d\.)/g;

export default function ListFooterComponent(props) {
  return (
    <View
      style={[
        styles.container,
        props.footerContainerWidth && {width: props.footerContainerWidth},
      ]}>
      <View style={styles.price}>
        <Text style={styles.amountText}>Total Amount:</Text>
        <Text style={styles.amount}>
          {props.totalAmount.toFixed(2).replace(currencyRegx, '$1,')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: deviceFactor(20),
    width: deviceFactor(190),
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
    borderColor: 'gray',
    borderTopWidth: deviceFactor(2),
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: deviceFactor(150),
    justifyContent: 'center',
  },
  amountText: {
    color: '#696969',
    fontSize: deviceFactor(7),
    fontWeight: 'bold',
    marginRight: deviceFactor(10),
  },
  amount: {
    color: '#696969',
    fontSize: deviceFactor(12),
    fontWeight: 'bold',
  },
});
