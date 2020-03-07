import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {deviceFactor} from '../../../Utils/resolution';
// import Colors from '../../Utils/colors';
import {deleteOrderedItem} from '../../../Actions/FoodActions';
import ReportsSeparatorComponent from './ReportsSeparatorComponent';
import {styles as rowStyle} from './ReportsHeaderComponent';

class ReportsComponent extends Component {
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
    if (item.paymentStatus !== '') {
      return (
        <View style={[rowStyle.container, styles.container]}>
          <View style={[rowStyle.SNo]}>
            <Text style={[rowStyle.text]}>S.No</Text>
          </View>
          <View style={[rowStyle.BNo]}>
            <Text style={[rowStyle.text]}>B.No.</Text>
          </View>
          <View style={[rowStyle.WCode]}>
            <Text style={[rowStyle.text]}>{item.waiterCode}</Text>
          </View>
          <View style={[rowStyle.PStatus]}>
            <Text style={[rowStyle.text]}>{item.paymentStatus}</Text>
          </View>
          <View style={[rowStyle.Date]}>
            <Text style={[rowStyle.text]}>{item.paymentDate}</Text>
          </View>
          <View style={[rowStyle.PType]}>
            <Text style={[rowStyle.text]}>{item.paymentType}</Text>
          </View>
          <View style={[rowStyle.CCode]}>
            <Text style={[rowStyle.text]}>{item.cashierCode}</Text>
          </View>
          <View style={[rowStyle.Amount]}>
            <Text style={[rowStyle.text]}>{item.amountPaid}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <FlatList
        data={this.props.bills}
        renderItem={this.renderItems}
        keyExtractor={item => item.itemNo}
        numColumns={1}
        ItemSeparatorComponent={() => <ReportsSeparatorComponent />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 0,
    backgroundColor: 'white',
  },
});

const mapDispatchToProps = dispatch => ({
  // deleteOrderedItem: index => dispatch(deleteOrderedItem(index)),
});

const mapStateToProps = state => ({
  bills: state.food.pendingBills,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportsComponent);
