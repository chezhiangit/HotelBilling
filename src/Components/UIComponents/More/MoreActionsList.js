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
import ReportsSeparatorComponent from '../ReportsComponents/ReportsSeparatorComponent';
import {setCurrentTable} from '../../../Actions/FoodActions';

const MoreActions = [
  'Food/Drinks Items',
  'Manage Users',
  'Set tax',
  'Set discount',
  'Manage Contacts',
  'Logout',
];

class MoreActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedActionIndex: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    // console.log('not focused 1', nextProps.navigation);
    // // console.log('tab index ... ', nextProps.navigationState);
    // if (state.selectedTableNo === '') {
    //   console.log('getDerivedStateFromProps .... pending bills');
    //   return {selectedTableNo: nextProps.tableNo};
    // }
    // if (!useIsFocused()) {
    //   console.log('not focused');
    //   return {selectedTableNo: ''};
    // }
    return {};
  }

  onRowSelected = selectedActionIndex => {
    // console.log('onRowSelected .... pending bills');
    this.setState({selectedActionIndex});
    // this.props.setCurrentTable(selectedTableNo);
    this.props.onItemSelected(selectedActionIndex);
  };

  renderActions = ({item, index}) => (
    <TouchableWithoutFeedback onPress={() => this.onRowSelected(index)}>
      <View
        style={[
          styles.container,
          this.state.selectedActionIndex === index && {
            backgroundColor: '#42aaf5',
          },
        ]}>
        <Text
          style={[
            styles.text,
            this.state.selectedActionIndex === index && {color: '#f7f7f7'},
          ]}>
          {item}
        </Text>
        {/* <Text style={[styles.text, {fontSize: deviceFactor(7)}]}>
          Server Name: {item.serverName}
        </Text> */}
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View>
        <FlatList
          data={MoreActions}
          renderItem={this.renderActions}
          keyExtractor={item => item}
          ItemSeparatorComponent={() => <ReportsSeparatorComponent />}
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
    padding: deviceFactor(5),
    // paddingTop: deviceFactor(5),
  },
  text: {
    color: '#696969',
    fontSize: deviceFactor(12),
  },
});

const mapStateToProps = state => ({
  // pendingBills: state.food.pendingBills,
  // tableNo: state.food.tableNo,
});

const mapDispatchToProps = dispatch => ({
  // setCurrentTable: tableNo => dispatch(setCurrentTable(tableNo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoreActionList);
