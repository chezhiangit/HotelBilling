/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import store from '../Billing/src/store/store';

import FoodPage from './src/Food/FoodPage';
import MorePage from './src/More/MorePage';
import BillingPage from './src/Billing/BillingPage';
import ReportPage from './src/Report/ReportPage';

import Colors from './src/Utils/colors';
import I18n from './src/locales/i18n';
import {deviceFactor} from './src/Utils/resolution';

const FoodTab = createStackNavigator(
  {
    foods: FoodPage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.activeTabColor,
        fontSize: deviceFactor(12),
        fontWeight: 'bold',
      },
      headerTitleStyle: {
        fontSize: deviceFactor(12),
        zIndex: 100,
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.tabCaptionColor,
      },
      // headerTintColor: '#FFFFFF',
      // title: `${I18n.t('menu.food')}/${I18n.t('menu.drinks')}`,
      title: 'Orders',
    },
    navigationOptions: {
      tabBarLabel: `${I18n.t('menu.food')}/${I18n.t('menu.drinks')}`,
    },
  },
);

const MoreTab = createStackNavigator(
  {
    more: MorePage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.activeTabColor,
        fontSize: deviceFactor(12),
        fontWeight: 'bold',
      },
      headerTitleStyle: {
        fontSize: deviceFactor(12),
        zIndex: 100,
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.tabCaptionColor,
      },
      // headerTintColor: '#FFFFFF',
      // title: I18n.t('menu.more'),
      title: 'More actions',
    },
    navigationOptions: {
      tabBarLabel: I18n.t('menu.more'),
    },
  },
);

const BillingTab = createStackNavigator(
  {
    bills: BillingPage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.activeTabColor,
        fontSize: deviceFactor(12),
        fontWeight: 'bold',
      },
      headerTitleStyle: {
        fontSize: deviceFactor(12),
        zIndex: 100,
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.tabCaptionColor,
      },
      // headerTintColor: '#FFFFFF',
      title: I18n.t('menu.billing'),
    },
    navigationOptions: {
      tabBarLabel: I18n.t('menu.billing'),
    },
  },
);

const ReportTab = createStackNavigator(
  {
    reports: ReportPage,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.activeTabColor,
        fontSize: deviceFactor(12),
        fontWeight: 'bold',
      },
      headerTitleStyle: {
        fontSize: deviceFactor(12),
        zIndex: 100,
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.tabCaptionColor,
      },
      // headerTintColor: '#FFFFFF',
      title: I18n.t('menu.report'),
    },
    navigationOptions: {
      tabBarLabel: I18n.t('menu.report'),
    },
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Food: FoodTab,
    Billing: BillingTab,
    Report: ReportTab,
    More: MoreTab,
  },
  {
    initialRouteName: 'Food',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeBackgroundColor: Colors.activeTabColor,
      // inactiveBackgroundColor: 'yellow',
      labelStyle: {
        fontSize: deviceFactor(12),
        color: '#f7f7f7',
        fontWeight: 'bold',
      },
      style: {
        shadowColor: 'rgba(58,55,55,0.1)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 3,
        borderTopColor: 'transparent',
        backgroundColor: Colors.tabBarBgColor,
        height: deviceFactor(40),
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   tabBarStyle: {
//     backgroundColor: Colors.tabBarBgColor,
//   },
// });

export default App;
