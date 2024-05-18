import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ProductImageSkeleton = () => {
  return <ShimmerPlaceHolder style={styles.container} />;
};

export default ProductImageSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 280,
    borderRadius: 15,
    alignSelf: 'center',
  },
});
