import React, {Component} from 'react';
import {FlatList, View} from 'react-native';

class PendingBillsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.pendingBills}
          renderItem={this.renderItems}
          keyExtractor={item => item.itemNo}
        />
      </View>
    );
  }
}
