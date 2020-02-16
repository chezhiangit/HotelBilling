import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import {deviceFactor} from '../../Utils/resolution';
import Colors from '../../Utils/colors';
import {saveOrder} from '../../Actions/FoodActions';

class ItemListComponent extends Component {
  constructor(props) {
    super(props);
  }

  onItemSelected = item => {
    // console.log('item selected', item);
    this.props.saveOrder(item, this.props.tableNo);
  };

  renderItems = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.tableNo === '') {
            this.props.onNoTableNumber();
          }
          this.props.tableNo && this.onItemSelected(item);
        }}>
        <View style={styles.item}>
          <Image
            source=""
            style={{
              height: deviceFactor(20),
              width: deviceFactor(20),
              borderColor: 'yellow',
              borderWidth: 1,
            }}
          />
          <Text style={styles.title}>{item.itemName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.items}
        renderItem={this.renderItems}
        keyExtractor={item => item.itemCode}
        numColumns={3}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.activeTabColor,
    padding: deviceFactor(5),
    width: deviceFactor(97),
    borderRadius: deviceFactor(1),
    margin: deviceFactor(1),
    flexDirection: 'row',
  },
  title: {
    fontSize: deviceFactor(10),
    color: Colors.tabCaptionColor,
  },
});

const mapDispatchToProps = dispatch => ({
  saveOrder: (item, tableNo) => dispatch(saveOrder(item, tableNo)),
});

const mapStateToProps = state => ({
  tableNo: state.food.tableNo,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListComponent);
