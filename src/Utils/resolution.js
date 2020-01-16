import {PixelRatio} from 'react-native';
export const deviceFactor = value => {
  return PixelRatio.get() * value;
};
