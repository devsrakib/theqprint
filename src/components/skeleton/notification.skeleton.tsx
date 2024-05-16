import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Color } from '../../constants/GlobalStyle';
import Animated, { FadeInDown } from 'react-native-reanimated';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const NotificationSkeleton = () => {
  return (
    <Animated.View entering={FadeInDown.delay(50).duration(200)} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <ShimmerPlaceHolder style={styles.imgCon} />
        <View style={{ marginLeft: 20, flex: 1, paddingHorizontal: 20 }}>
          <ShimmerPlaceHolder style={[styles.textBoxOne, styles.common]} />
          <ShimmerPlaceHolder style={[styles.textBoxTwo, styles.common]} />
          <View style={styles.priceCon}>
            <ShimmerPlaceHolder style={[styles.priceBox, styles.common]} />
            <ShimmerPlaceHolder style={[styles.dayBox, styles.common]} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default NotificationSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
  },
  imgCon: {
    width: 80,
    height: 80,
  },
  textBoxOne: {
    width: '100%',
    height: 18,
    marginBottom: 10,
    borderRadius: 10,
  },
  common: {
    height: 18,
    marginBottom: 10,
    borderRadius: 10,
  },
  textBoxTwo: {
    width: '70%',
  },
  priceCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBox: {
    width: 100,
  },
  dayBox: {
    width: 100,
  },
});
