import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Animated, { ZoomInUp } from 'react-native-reanimated';
import { ILogo, NLogo, PLogo, QLogo, RLogo, TLogo } from '../../../assets/allSvg/AllSvg';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const CustomAnimatedLogo = () => {
  return (
    <View style={styles.logoCon}>
      <Animated.View entering={ZoomInUp.delay(50).duration(500).springify().damping(14)}>
        <QLogo />
      </Animated.View>
      <Animated.View entering={ZoomInUp.delay(100).duration(600).springify().damping(14)}>
        <PLogo />
      </Animated.View>
      <Animated.View
        entering={ZoomInUp.delay(200).duration(700).springify().damping(14)}
        style={styles.logoStyle}
      >
        <RLogo />
      </Animated.View>
      <Animated.View
        entering={ZoomInUp.delay(300).duration(800).springify().damping(14)}
        style={styles.logoStyle}
      >
        <ILogo />
      </Animated.View>
      <Animated.View
        entering={ZoomInUp.delay(400).duration(900).springify().damping(14)}
        style={styles.logoStyle}
      >
        <NLogo />
      </Animated.View>
      <Animated.View
        entering={ZoomInUp.delay(500).duration(1000).springify().damping(14)}
        style={styles.logoStyle}
      >
        <TLogo />
      </Animated.View>
    </View>
  );
};

export default CustomAnimatedLogo;

const styles = StyleSheet.create({
  logoCon: {
    marginTop: SCREEN_HEIGHT <= 800 ? 80 : 120,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  logoStyle: {
    marginBottom: 5,
    marginLeft: 2,
  },
});
