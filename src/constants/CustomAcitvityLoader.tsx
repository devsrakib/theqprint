import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Color } from './GlobalStyle';

const LineLoader = ({ angle }: any) => {
  const rotation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[styles.line, { transform: [{ rotate: interpolatedRotation }, { rotate: angle }] }]}
    />
  );
};

const CustomActivityLoader = () => {
  return (
    <View style={styles.container}>
      <LineLoader angle="0deg" />
      <Gap />
      <LineLoader angle="45deg" />
      <Gap />
      <LineLoader angle="90deg" />
      <Gap />
      <LineLoader angle="135deg" />
    </View>
  );
};

const Gap = () => <View style={styles.gap} />;
const WhiteCenter = () => <View style={styles.whiteCenter} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 4,
    height: 26,
    borderRadius: 4,
    backgroundColor: Color.C_main,
    position: 'absolute',
  },
  gap: {
    height: 10, // Adjust the gap height as needed
  },
  whiteCenter: {
    width: 8, // Adjust size as needed
    height: 8, // Adjust size as needed
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 10, // Half of the width and height to make it circular
    zIndex: 100,
  },
});

export default CustomActivityLoader;
