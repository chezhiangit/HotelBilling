import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {deviceFactor} from '../../Utils/resolution';

const NewOrderComponent = props => {
  return (
    <View style={styles.container}>
      {/* <Text>Enter Table Number:</Text> */}
      <TextInput
        onChangeText={text => props.onTextChange(text)}
        placeholder={'Enter table number'}
        style={styles.text}
        autoFocus={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    width: deviceFactor(200),
    height: deviceFactor(30),
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#006600',
    justifyContent: 'center',
  },
  text: {
    fontSize: deviceFactor(12),
    color: '#737373',
  },
});

export default NewOrderComponent;
