import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeInDown } from 'react-native-reanimated';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DATA = [1, 1, 1, 1, 1, 1];
const AllProductSkeleton = () => {
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      exiting={FadeInDown.delay(50).duration(500)}
    >
      <FlatList
        data={DATA}
        contentContainerStyle={styles.container}
        numColumns={2}
        renderItem={({ item }) => {
          // Destructuring item
          return <ShimmerPlaceHolder style={styles.item} />;
        }}
        keyExtractor={(item, index) => index.toString()} // Added keyExtractor
      />
    </Animated.View>
  );
};

export default AllProductSkeleton;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-between', // Adjusted to space between
    // flexWrap: 'wrap', // Added flex wrap
    paddingTop: 10,
    gap: 10,
  },
  item: {
    flex: 1, // Adjusted width to fit two items with gap
    height: 200,
    marginBottom: 10, // Added marginBottom for better spacing
    borderRadius: 15,
    marginLeft: 20,
  },
});
