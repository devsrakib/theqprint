import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const Carousel_Skeleton = () => {
  return (
    <View>
      <ShimmerPlaceHolder style={styles.shimmer}></ShimmerPlaceHolder>
    </View>
  );
};

export default Carousel_Skeleton;
const styles = StyleSheet.create({
  shimmer: {
    height: 220,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});
