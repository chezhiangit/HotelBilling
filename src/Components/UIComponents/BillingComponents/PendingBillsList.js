import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {deviceFactor} from '../../../Utils/resolution';
import ListSeparatorComponent from '../OrderListComponents/ListSeparatorComponent';
import {setCurrentTable} from '../../../Actions/FoodActions';

class PendingBillsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTableNo: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    // console.log('not focused 1', nextProps.navigation);
    // console.log('tab index ... ', nextProps.navigationState);
    if (state.selectedTableNo === '') {
      // console.log('getDerivedStateFromProps .... pending bills');
      return {selectedTableNo: nextProps.tableNo};
    }
    // if (!useIsFocused()) {
    //   console.log('not focused');
    //   return {selectedTableNo: ''};
    // }
    return {};
  }

  onRowSelected = selectedTableNo => {
    // console.log('onRowSelected .... pending bills');
    this.setState({selectedTableNo});
    this.props.setCurrentTable(selectedTableNo);
  };

  renderItems = ({item, index}) => {
    if (item.paymentStatus === '') {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.onRowSelected(item.tableNo)}>
          <View
            style={[
              styles.container,
              this.props.tableNo === item.tableNo && {
                backgroundColor: '#42aaf5',
              },
            ]}>
            <Text
              style={[
                styles.text,
                this.props.tableNo === item.tableNo && {color: '#f7f7f7'},
              ]}>
              Table Number: {item.tableNo}
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: deviceFactor(7)},
                this.props.tableNo === item.tableNo && {color: '#f7f7f7'},
              ]}>
              Server Name: {item.serverName}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.pendingBills}
          renderItem={this.renderItems}
          keyExtractor={item => item.itemNo}
          ItemSeparatorComponent={() => <ListSeparatorComponent />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: deviceFactor(20),
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingBottom: deviceFactor(5),
    paddingTop: deviceFactor(5),
  },
  text: {
    color: '#696969',
    fontSize: deviceFactor(12),
  },
});

const mapStateToProps = state => ({
  pendingBills: state.food.pendingBills,
  tableNo: state.food.tableNo,
});

const mapDispatchToProps = dispatch => ({
  setCurrentTable: tableNo => dispatch(setCurrentTable(tableNo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingBillsList);
