import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {deviceFactor} from '../../../Utils/resolution';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ReportsHeaderComponent(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.SNo]}>
        <Text style={[styles.text]}>S.No</Text>
      </View>
      <View style={[styles.BNo]}>
        <Text style={[styles.text]}>B.No.</Text>
      </View>
      <View style={[styles.WCode]}>
        <Text style={[styles.text]}>W.Code</Text>
      </View>
      <View style={[styles.PStatus]}>
        <Text style={[styles.text]}>P.Status.</Text>
      </View>
      <View style={[styles.Date]}>
        <Text style={[styles.text]}>Date.</Text>
      </View>
      <View style={[styles.PType]}>
        <Text style={[styles.text]}>P.Type.</Text>
      </View>
      <View style={[styles.CCode]}>
        <Text style={[styles.text]}>C.Code</Text>
      </View>
      <View style={[styles.Amount]}>
        <Text style={[styles.text]}>Amt.</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
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
    // justifyContent: 'center',
    // borderWidth: 2,
  },
  SNo: {
    height: '100%',
    width: deviceFactor(30),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  BNo: {
    height: '100%',
    width: deviceFactor(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
  },
  WCode: {
    height: '100%',
    width: deviceFactor(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
  },
  CCode: {
    height: '100%',
    width: deviceFactor(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
  },
  PStatus: {
    height: '100%',
    width: deviceFactor(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
  },
  Date: {
    height: '100%',
    width: deviceFactor(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
  },
  PType: {
    height: '100%',
    width: deviceFactor(70),
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: deviceFactor(2),
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
  },
  Amount: {
    height: '100%',
    width: deviceFactor(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
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
  toggleButton: {
    width: deviceFactor(50),
    height: deviceFactor(50),
    position: 'absolute',
  },
});
