import React from 'react';
import {
  Animated, Easing, Dimensions,
} from 'react-native';


const { height, width } = Dimensions.get('window');

const styles = {
  container: {
    position: 'absolute',
    // height: '100%',
    // width: '50%%',
    right: -width, // initial position of the view. Hide the view at bottom. for bottom to top -height
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    elevation: 1,
  },
};

export default class ViewLogAnimatedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.translate = new Animated.Value(0);
    this.hidingPosition = 0;// = -width //for bottom to top, use -height
    this.translateModal = 0; //= this.translate.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, this.hidingPosition]
    // });
    this.translateStyle = null;// = { transform: [{ translateX: this.translateModal }] };
  }

  componentDidMount() {
    if (this.props.animateFrom === 'right') {
      this.hidingPosition = -width;
      this.animateStyle = { right: -width, height: this.props.height, width: this.props.width };
      this.translateStyle = { transform: [{ translateX: this.findTranslateValue() }] };
    } else if (this.props.animateFrom === 'left') {
      this.hidingPosition = width;
      this.animateStyle = { left: -width, height: this.props.height, width: this.props.width };
      this.translateStyle = { transform: [{ translateX: this.findTranslateValue() }] };
    } else if (this.props.animateFrom === 'bottom') {
      this.hidingPosition = -height;
      this.animateStyle = { bottom: -height, height: this.props.height, width: this.props.width };
      this.translateStyle = { transform: [{ translateY: this.findTranslateValue() }] };
    } else if (this.props.animateFrom === 'top') {
      this.hidingPosition = height;
      this.animateStyle = { top: -height, height: this.props.height, width: this.props.width };
      this.translateStyle = { transform: [{ translateY: this.findTranslateValue() }] };
    }
  }

  shouldComponentUpdate(nextProps /* nextState */) {
    if (this.props.visible === nextProps.visible) {
      return false;
    }
    return true;
  }

  componentDidUpdate(/* prevProps, prevState */) {
    if (this.props.visible) {
      // animate to show the modal
      this.translate.setValue(0); // reset the animated value
      Animated.spring(this.translate, {
        toValue: 1,
        duration: 400,
        overshootClamping: true,
      }).start();
    } else {
      // animate to hide the modal
      Animated.timing(this.translate, {
        toValue: 0,
        duration: 400,
        easing: Easing.linear,
      }).start();
    }
  }

  findTranslateValue = () => {
    this.translateModal = this.translate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.hidingPosition],
    });
    return this.translateModal;
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          this.translateStyle,
          this.animateStyle,
          this.props.containerStyle,
        ]
        }
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
