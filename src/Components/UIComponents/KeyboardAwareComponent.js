import React, { PureComponent } from 'react';
import {
  Animated,
  Keyboard,
  Easing,
} from 'react-native';
import { adapter } from '../../utils/adapterUtil';

const KeyboardAwareComponent = ChildComponent => class ParentComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shift: new Animated.Value(0),
    };
    this.keyboardDidShowSub = null;
    this.keyboardDidHideSub = null;
    this.moveTo = adapter(170);
  }

    handleKeyboardDidShow = () => {
      Animated.timing(this.state.shift, {
        toValue: -adapter(this.moveTo), // move towards top of the page
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ball,
      }).start();
    };

    handleKeyboardDidHide = () => {
      console.log('handleKeyboardDidHide.....');
      Animated.timing(this.state.shift, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ball,
      }).start();
    };

    registerKeyboard = () => {
      console.log('registerKeyboard.....');
      this.keyboardDidShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.handleKeyboardDidShow,
      );
      this.keyboardDidHideSub = Keyboard.addListener(
        'keyboardDidHide',
        this.handleKeyboardDidHide,
      );
    };

    deregisterKeyboard = () => {
      console.log('deregisterKeyboard.....');
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    };

    onSubmit = () => {
      Keyboard.dismiss();
    };

    onFieldFocus = (moveTo) => {
      this.moveTo = moveTo;
    };

    render() {
      return (
        <ChildComponent
          {...this.props}
          onFieldFocus={this.onFieldFocus}
          deregisterKeyboard={this.deregisterKeyboard}
          registerKeyboard={this.registerKeyboard}
          shift={this.state.shift}
        />
      );
    }
};

export default KeyboardAwareComponent;
