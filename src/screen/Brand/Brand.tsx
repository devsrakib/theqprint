/**
 * Brand Component
 *
 * This component renders a list of top brands and all brands in a scrollable view.
 *
 * Features:
 * - Utilizes a CommonHeader component to display the title "Brand" at the top.
 * - Displays a list of top brands horizontally using FlatList and TopBrand component.
 * - Renders all brands vertically using FlatList and AllBrand component.
 * - Integrates animations such as FadeInDown, FadeInLeft, and FadeInRight for visual effects.
 * - Implements SafeAreaView and StatusBar for better layout and status bar configuration.
 *
 * @returns JSX.Element
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { brandStyle } from './BrandStyle';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import TopBrand from './topBrand/TopBrand';
import AllBrand from './allBrand/AllBrand';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import BrandCircleSkeleton from '../../components/skeleton/Brand.circle.skeleton';
import Cart_Skeleton from '../../components/skeleton/Cart_SkeletonInHome';
import BrandCartSkeleton from '../../components/skeleton/Brand.cart.skeleton';
import { useGetBrandQuery } from '../../redux/api/brandSlice';
import { IBrand } from '../../types/interfaces/product.interface';
import { useBrand } from '../../hooks/allHooks';
import { Color } from '../../constants/GlobalStyle';
import CustomActivityLoader from '../../constants/CustomAcitvityLoader';

const Brand = () => {
  const { data, isLoading, setRefetch } = useBrand();

  const [items, setItems] = useState<IBrand[]>([]);
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      setItems(data.data);
      setMeta(data.meta);
    }
  }, [data, isLoading]);

  const fetchData = async () => {
    if (!loading && meta.page * meta.limit < meta.total) {
      setLoading(true);
      const response = await fetch(
        `https://api.theqprint.com/api/v1/brand?page=${meta.page + 1}&limit=${meta.limit}`
      );
      const jsonData = await response.json();
      setItems([...items, ...jsonData.data]);
      setMeta(jsonData.meta);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => <AllBrand item={item} />;

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <CustomActivityLoader />
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View style={brandStyle.container}>
      {/* Custom Header */}
      <CommonHeader title="Brand" cartBox={true} />

      {/* Body Container */}
      <ScrollView>
        <View style={brandStyle.bodyContainer}>
          <Text style={brandStyle.topBrandText}>Top Brand</Text>

          {/* Top Brand Section */}
          {isLoading ? (
            <BrandCircleSkeleton />
          ) : (
            <Animated.FlatList
              entering={FadeInRight.delay(50).duration(500)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
              data={data?.data}
              renderItem={({ item }) => <TopBrand item={item} />}
              keyExtractor={(item, index) => index.toString()} // Add key extractor
            />
          )}

          {/* All Brand Container */}
          <View style={brandStyle.allBrandContainer}>
            <Text style={brandStyle.allBrandText}>All Brand</Text>
            {isLoading ? (
              <BrandCartSkeleton />
            ) : (
              <Animated.View style={brandStyle.allCartContainer}>
                {/* Render All Brands */}
                <FlatList
                  data={items}
                  keyExtractor={(item: any, index) => `${item.key}${index}`}
                  onEndReached={fetchData}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={renderFooter}
                  numColumns={2}
                  removeClippedSubviews={true}
                  renderItem={renderItem}
                  contentContainerStyle={{ justifyContent: 'space-between' }}
                />
                {/* {items?.map((item: IBrand, index: number) => {
                  return <AllBrand key={item?.brandId} item={item} />; // all brand cart
                })} */}
              </Animated.View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* StatusBar Configuration */}
      <StatusBar style="dark" />
    </View>
  );
};

export default Brand;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingHorizontal: 10,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 0.5, // Make each item take half of the available width (for 2 columns)
    padding: 8, // Add padding for spacing between items
  },
});
