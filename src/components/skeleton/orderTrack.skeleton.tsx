import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Color } from '../../constants/GlobalStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Animated, { FadeInDown } from 'react-native-reanimated';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const OrderTrackSkeleton = () => {
  return (
    <Animated.View entering={FadeInDown.delay(50).duration(300)} style={styles.container}>
      <View style={styles.boxOne}>
        <View>
          <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerOne]} />
          <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerTwo]} />
        </View>
        <ShimmerPlaceHolder style={styles.statusShimmer} />
      </View>
      <View style={styles.boxTwo}>
        <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerOne]} />
        <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerTwo, { width: '60%' }]} />
        <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerTwo]} />
      </View>
      <View style={styles.boxThree}>
        <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerTwo, { width: '40%' }]} />
        <ShimmerPlaceHolder style={[styles.common, styles.BOShimmerTwo, { width: '40%' }]} />
      </View>
    </Animated.View>
  );
};

export default OrderTrackSkeleton;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  boxOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  common: {
    height: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  BOShimmerOne: {
    width: '100%',
  },
  BOShimmerTwo: {
    width: '50%',
  },
  statusShimmer: {
    height: 40,
    borderRadius: 20,
    width: 100,
  },
  boxTwo: {
    marginTop: 20,
  },
  boxThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
