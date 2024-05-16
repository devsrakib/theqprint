import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { Color } from '../../constants/GlobalStyle';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const CustomLoader = ({
  indicator,
  setIndicator,
}: {
  indicator: boolean;
  setIndicator: Function;
}) => {
  const toggleModal = () => {
    setIndicator(false);
  };

  const [shouldPlayLottie, setShouldPlayLottie] = useState<boolean>(true);
  const animation = useRef<any>(null);

  // useEffect(() => {
  //   // This effect runs when the component mounts.
  //   // It plays the Lottie animation once after a delay of 500 milliseconds.
  //   if (shouldPlayLottie) {
  //     setTimeout(() => {
  //       animation.current?.play();
  //       setShouldPlayLottie(false);
  //     }, 500);
  //   }
  // }, [shouldPlayLottie]);
  return (
    <View style={styles.container}>
      <Modal
        swipeDirection="down"
        onSwipeComplete={() => toggleModal()}
        isVisible={indicator}
        backdropOpacity={0.3}
        // style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <LottieView
            loop={true}
            ref={animation}
            autoPlay
            style={{ width: 40, height: 40, position: 'absolute' }}
            source={require('../../../assets/image/Loader.json')}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default CustomLoader;
