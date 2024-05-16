import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ProductDetailSkeleton = () => {
  return <ShimmerPlaceHolder style={styles.container} />;
};

export default ProductDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280,
    borderRadius: 15,
  },
});
