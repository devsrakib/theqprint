import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const BrandCircleSkeleton = () => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        data={[1, 1, 1, 1, 1, 1]}
        renderItem={({}) => {
          return (
            <View style={styles.container}>
              <ShimmerPlaceHolder style={styles.item} />
              <ShimmerPlaceHolder style={styles.itemText} />
            </View>
          );
        }}
        horizontal
      />
    </View>
  );
};

export default BrandCircleSkeleton;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // flexDirection: 'coulmn',
    justifyContent: 'center',
    width: 100,
    marginLeft: 10,
  },
  item: {
    width: 60,
    height: 60,
    borderRadius: 50,
    // marginLeft: 20,
    marginVertical: 10,
    marginTop: 10,
  },
  itemText: {
    height: 20,
    width: 80,
    borderRadius: 50,
  },
});
