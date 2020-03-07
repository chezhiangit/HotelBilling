import React, {Component} from 'react';
import {FloatingAction} from 'react-native-floating-action';

const actions = [
  {
    text: 'KOT Bill',
    // icon: require('./images/ic_accessibility_white.png'),
    name: 'bt_kotbill',
    position: 2,
  },
  {
    text: 'Billing',
    // icon: require('./images/ic_language_white.png'),
    name: 'bt_billing',
    position: 1,
  },
  // {
  //   text: 'Location',
  //   // icon: require('./images/ic_room_white.png'),
  //   name: 'bt_room',
  //   position: 3,
  // },
  // {
  //   text: 'Video',
  //   // icon: require('./images/ic_videocam_white.png'),
  //   name: 'bt_videocam',
  //   position: 4,
  // },
];

class FloatingButton extends Component {
  constructor(props) {
    super(props);
  }

  handleFloatingBtnAction = btnName => {
    // console.log('Floating btn name .....', btnName);
    switch (btnName) {
      case 'bt_billing':
        this.props.onBilling();
        break;
    }
  };

  render() {
    return (
      <FloatingAction
        ref={ref => {
          this.floatingAction = ref;
        }}
        position="left"
        actions={actions}
        onPressItem={this.handleFloatingBtnAction}
      />
    );
  }
}

export default FloatingButton;
