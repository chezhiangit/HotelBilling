import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import {deviceFactor} from '../../../Utils/resolution';

export default function ReportsSeparatorComponent() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
  },
});
