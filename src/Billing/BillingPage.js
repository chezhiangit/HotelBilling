import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import I18n from '../locales/i18n';

export default class BillingPage extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{I18n.t('hello')}</Text>
      </View>
    );
  }
}
