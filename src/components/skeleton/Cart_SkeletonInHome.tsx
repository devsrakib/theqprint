import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const Cart_Skeleton = () => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 1]}
        renderItem={({}) => {
          return (
            <ShimmerPlaceHolder style={styles.shimmer}></ShimmerPlaceHolder>
          );
        }}
      />
    </View>
  );
};

export default Cart_Skeleton;
const styles = StyleSheet.create({
  shimmer: {
    height: 220,
    width: 180,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
  },
});
