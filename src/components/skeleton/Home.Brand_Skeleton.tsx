import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Brand_Skeleton = () => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={[1, 1, 1, 1, 1]}
        renderItem={({}) => {
          return <ShimmerPlaceHolder style={styles.item} />;
        }}
        horizontal
      />
    </View>
  );
};

export default Brand_Skeleton;

const styles = StyleSheet.create({
  item: {
    width: 70,
    height: 40,
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 10,
  },
});
