import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const BrandCartSkeleton = () => {
  return (
    <View>
      <FlatList
        // horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 1, 1, 1, 1, 1]}
        numColumns={2}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({}) => {
          return <ShimmerPlaceHolder style={styles.shimmer}></ShimmerPlaceHolder>;
        }}
      />
    </View>
  );
};

export default BrandCartSkeleton;
const styles = StyleSheet.create({
  shimmer: {
    height: 180,
    // width: 180,
    borderRadius: 10,
    marginLeft: 20,
    // marginTop: 10,
    marginBottom: 20,
    flex: 1,
  },
});
