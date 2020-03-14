import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
// import I18n from '../locales/i18n';
import {deviceFactor} from '../Utils/resolution';
// import ReportsComponent from '../Components/UIComponents/ReportsComponents/ReportsComponent';
// import ReportsHeaderComponent from '../Components/UIComponents/ReportsComponents/ReportsHeaderComponent';
// import ReportsFooterComponent from '../Components/UIComponents/ReportsComponents/ReportsFooterComponent';
import MoreActionsList from '../Components/UIComponents/More/MoreActionsList';
import ItemListComponent from '../Components/UIComponents/More/ItemList';
import AddEditItemDialog from '../Components/UIComponents/More/AddEditItemDialog';
import Color from '../Utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import FloatingButton from '../Components/UIComponents/FloatingButtons';

const DATA = [
  {
    itemCode: '100',
    itemName: 'Idly',
    price: '100.75',
    qty: '1',
  },
  {
    itemCode: '101',
    itemName: 'Dosa',
    price: '200.25',
    qty: '1',
  },
  {
    itemCode: '102',
    itemName: 'Vada',
    price: '75.50',
    qty: '1',
  },
  {
    itemCode: '103',
    itemName: 'Poori',
    price: '150.00',
    qty: 1,
  },
  {
    itemCode: '104',
    itemName: 'Pongal',
    price: '105.00',
    qty: '1',
  },
  {
    itemCode: '105',
    itemName: 'Tea',
    price: '15',
    qty: '1',
  },
  {
    itemCode: '106',
    itemName: 'Coffee',
    price: '25',
    qty: '1',
  },
  {
    itemCode: '107',
    itemName: 'Pepsi',
    price: '30.50',
    qty: '1',
  },
  {
    itemCode: '108',
    itemName: 'Rotti',
    price: '50.50',
    qty: '1',
  },
  {
    itemCode: '109',
    itemName: 'Parotta',
    price: '40.00',
    qty: '1',
  },
  {
    itemCode: '110',
    itemName: 'Lemon Rice',
    price: '50.50',
    qty: '1',
  },
  {
    itemCode: '111',
    itemName: 'Full meals',
    price: '100.50',
    qty: '1',
  },
];

class MorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemListData: [...DATA],
      showItems: true,
      showUsers: false,
      showTax: false,
      showDiscount: false,
      showContacts: false,
      showAddItemsDlg: false,
    };
  }

  logout = () => {};

  onActionSelected = index => {
    switch (index) {
      case 0:
        this.setState({
          showItems: true,
          showContacts: false,
          showDiscount: false,
          showTax: false,
          showUsers: false,
        });
        break;
      case 1:
        this.setState({
          showItems: false,
          showContacts: false,
          showDiscount: false,
          showTax: false,
          showUsers: true,
        });
        break;
      case 2:
        this.setState({
          showItems: false,
          showContacts: false,
          showDiscount: false,
          showTax: true,
          showUsers: false,
        });
        break;
      case 3:
        this.setState({
          showItems: false,
          showContacts: false,
          showDiscount: true,
          showTax: false,
          showUsers: false,
        });
        break;
      case 4:
        this.setState({
          showItems: false,
          showContacts: true,
          showDiscount: false,
          showTax: false,
          showUsers: false,
        });
        break;
      case 5:
        this.setState({showLogout: true});
        break;
      default:
        this.setState({
          showItems: true,
          showContacts: false,
          showDiscount: false,
          showTax: false,
          showUsers: false,
        });
        break;
    }
  };

  onItemSelected = () => {
    this.onAddEditDlgDone = this.onEditItemDone;
    this.setState({
      showAddItemsDlg: true,
      addEditDlgTitle: 'View / Edit Item',
    });
  };

  onEditItemDone = () => {
    this.setState({
      showAddItemsDlg: false,
    });
  };

  onAddItemDone = () => {
    this.setState({
      showAddItemsDlg: false,
    });
  };

  onAddEditDlgCancel = () => {
    this.setState({
      showAddItemsDlg: false,
    });
  };

  render() {
    return (
      <View style={styles.maintainer}>
        <View style={styles.ActionsView}>
          {this.state.showItems && (
            <>
              <ItemListComponent
                items={this.state.itemListData}
                onItemSelected={this.onItemSelected}
              />
              <View style={styles.addItemBtn}>
                <TouchableOpacity
                  onPress={() => {
                    this.onAddEditDlgDone = this.onAddItemDone;
                    this.setState({
                      showAddItemsDlg: true,
                      addEditDlgTitle: 'Add New Item',
                    });
                  }}>
                  <Text style={styles.plusSymbol}>+</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <View style={styles.MoreActionsListView}>
          <View style={styles.MoreActionsListContainer}>
            <Text style={styles.text}>Actions</Text>
          </View>
          <MoreActionsList onItemSelected={this.onActionSelected} />
        </View>

        <AddEditItemDialog
          isDialogVisible={this.state.showAddItemsDlg}
          dlgTitle={this.state.addEditDlgTitle}
          onDlgDone={this.onAddEditDlgDone}
          onDlgCancel={this.onAddEditDlgCancel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maintainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  ActionsView: {
    width: '70%',
    borderRightWidth: deviceFactor(2),
    borderRightColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MoreActionsListView: {
    width: '30%',
  },
  MoreActionsListContainer: {
    height: deviceFactor(20),
    backgroundColor: '#F5F5F5',
    borderColor: 'gray',
    borderBottomWidth: deviceFactor(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#696969',
    fontSize: deviceFactor(12),
    fontWeight: 'bold',
  },
  addItemBtn: {
    position: 'absolute',
    bottom: deviceFactor(10),
    right: deviceFactor(10),
    height: deviceFactor(30),
    width: deviceFactor(30),
    borderRadius: 100,
    backgroundColor: Color.activeTabColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSymbol: {
    fontSize: deviceFactor(20),
    color: Color.tabCaptionColor,
    height: deviceFactor(28),
    width: deviceFactor(28),
    // borderWidth: 1,
    // borderColor: 'red',
    textAlign: 'center',
    // borderRadius: 100,
  },
});

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MorePage);
