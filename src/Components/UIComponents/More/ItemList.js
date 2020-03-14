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

import {deviceFactor} from '../../../Utils/resolution';
import Colors from '../../../Utils/colors';
// import {saveOrder} from '../../../Actions/FoodActions';

class ItemListComponent extends Component {
  constructor(props) {
    super(props);
  }

  // onItemSelected = item => {
  //   // console.log('item selected', item);
  //   this.props.onItemSelected(item);
  // };

  renderItems = ({item, index}) => {
    return (
      <View style={styles.itmeContainer}>
        <View style={styles.deleteCircle}>
          <Text style={styles.closeBtn}>X</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.onItemSelected(item, index)}>
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
      </View>
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
  itmeContainer: {
    backgroundColor: Colors.activeTabColor,
    padding: deviceFactor(5),
    width: deviceFactor(100),
    margin: deviceFactor(5),
  },
  item: {
    width: deviceFactor(97),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: deviceFactor(10),
    color: Colors.tabCaptionColor,
    marginLeft: deviceFactor(2),
  },
  deleteCircle: {
    position: 'absolute',
    top: deviceFactor(-5),
    right: deviceFactor(-5),
    height: deviceFactor(16),
    width: deviceFactor(16),
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    // backgroundColor: 'gray',
    // opacity: 1,
  },
  closeBtn: {
    fontWeight: 'bold',
    fontSize: deviceFactor(10),
    color: 'red',
  },
});

const mapDispatchToProps = dispatch => ({
  // saveOrder: (item, tableNo) => dispatch(saveOrder(item, tableNo)),
});

const mapStateToProps = state => ({
  // tableNo: state.food.tableNo,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListComponent);
