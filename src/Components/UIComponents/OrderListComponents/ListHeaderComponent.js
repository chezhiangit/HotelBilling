import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {deviceFactor} from '../../../Utils/resolution';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ListHeaderComponent(props) {
  return (
    <View style={styles.container}>
      <View style={styles.count}>
        <Text style={styles.text}>S.N</Text>
      </View>
      <View style={styles.itemName}>
        <Text style={styles.text}>Item Name</Text>
      </View>
      <View style={styles.qty}>
        <Text style={styles.text}>Qty</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.text}>Price</Text>
      </View>
      <TouchableOpacity onPress={props.onClearAllOrderedItems}>
        <View style={styles.clear}>
          <Text style={styles.text}>C</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: deviceFactor(20),
    width: deviceFactor(190),
    // width: '100%',
    backgroundColor: '#F5F5F5',
    borderColor: 'gray',
    borderBottomWidth: deviceFactor(2),
    marginBottom: deviceFactor(1),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  count: {
    height: '100%',
    width: deviceFactor(15),
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'gray',
  },
  itemName: {
    height: '100%',
    width: deviceFactor(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    height: '100%',
    width: deviceFactor(15),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  price: {
    height: '100%',
    width: deviceFactor(38),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: deviceFactor(2),
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
