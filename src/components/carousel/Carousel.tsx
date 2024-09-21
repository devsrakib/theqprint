/**
 * Carousel Component
 *
 * This component renders a horizontal carousel of logos with pagination.
 *
 * Features:
 * - Renders a FlatList to display logos horizontally.
 * - Utilizes SliderItem component to render each logo item.
 * - Utilizes Pagination component to display pagination dots.
 * - Tracks the current scroll position using useRef and Animated.
 * - Updates the current index of the carousel based on the visible item.
 *
 * @returns JSX.Element
 */

import React, { useRef, useState } from 'react';
import { View, Animated } from 'react-native';

import Pagination from './Pagination';
import SliderItem from './SliderItem';
import { useCarousel } from '../../hooks/allHooks';
import EmptyData from '../common/EmptyData';
const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState<number>(0);

  const { data } = useCarousel();
  const sliderArray = Object.values(data?.data?.slider || {});

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={{ width: '100%', marginTop: 10, height: 245 }}>
      {/* FlatList to render logos */}
      <Animated.FlatList
        data={sliderArray}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SliderItem item={item} />}
        // keyExtractor={item => item?._id}
        onScroll={handleOnScroll}
        contentContainerStyle={{ flex: 1 }}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        ListEmptyComponent={<EmptyData width={90} height={90} children="No Carousel" />}
      />
      {/* Pagination dots */}
      <Pagination data={sliderArray} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Carousel;
