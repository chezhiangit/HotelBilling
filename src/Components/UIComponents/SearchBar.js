import React, {Component} from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deviceFactor} from '../../Utils/resolution';

export const SearchBar = props => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput style={styles.searchTextInput} />
      {/* <Image style={styles.searchIcon} /> */}
      {/* <Icon name="search1" size={30} color="rgb(238,238,238)" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    height: deviceFactor(30),
    width: '98%',
    margin: '1%',
    borderColor: '#708090',
    borderRadius: deviceFactor(1),
    borderWidth: deviceFactor(1),
    borderBottomWidth: deviceFactor(1),
  },
  searchTextInput: {
    width: '90%',
    height: '100%',
    fontSize: deviceFactor(12),
    color: 'rgb(84,95,122)',
  },
  searchIcon: {
    height: deviceFactor(30),
    width: deviceFactor(50),
  },
});
