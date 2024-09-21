import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useCallback, memo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

import { homePageStyle } from './HomePageStyle';
import { Magnify } from '../../../assets/allSvg/AllSvg';
import { CartItemContext } from '../../Providers/CartItemProvider';
import Brand from '../../components/brandInHome/Brand';
import Cart from '../../components/card/allCart/Cart';
import OfferCart from '../../components/card/offeredCart/OfferCart';
import Carousel from '../../components/carousel/Carousel';
import HomePageProductCateTitle from '../../components/common/homePageProductCategory/HomePageProductCateTitle';
import HomePageTopCon from '../../components/homePageTopCon/HomePageHeader';
import Carousel_Skeleton from '../../components/skeleton/Carousel_Skeleton';
import Cart_Skeleton from '../../components/skeleton/Cart_SkeletonInHome';
import Brand_Skeleton from '../../components/skeleton/Home.Brand_Skeleton';
import { Color } from '../../constants/GlobalStyle';
import {
  useBrand,
  useCarousel,
  useGetCart,
  useProduct,
  useSortedProduct,
} from '../../hooks/allHooks';
import { IProduct } from '../../types/interfaces/product.interface';
import EmptyData from '~/components/common/EmptyData';

const Home = () => {
  const navigation = useNavigation<any>();
  const { cart, setCart } = useContext(CartItemContext);
  const { data: brandData, isLoading: isBrandLoading } = useBrand();
  const { data: productData, isLoading: loadingProduct } = useProduct();
  const { data: carouselData, isLoading: carouselLoading } = useCarousel();
  const { data: sortedData, isLoading: sortedDataLoading } = useSortedProduct();
  const { data: cartData } = useGetCart();

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData, setCart]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={homePageStyle.itemContainer}>
        <Cart item={item} />
      </View>
    ),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ flex: 1, backgroundColor: Color.C_white }}>
        {/* Header Container */}
        <HomePageTopCon />

        {/* Body container */}
        <ScrollView style={{ flex: 1 }}>
          {/* Search and Three-line Container */}
          <Animated.View
            entering={FadeInLeft.delay(50).duration(150)}
            style={homePageStyle.searchAndthreelineCon}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.7}
              style={homePageStyle.searchContainer}>
              <Magnify />
              <Text style={homePageStyle.searchText}>Search Products</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Brand Logo Container */}
          {isBrandLoading ? (
            <Brand_Skeleton />
          ) : (
            <Animated.FlatList
              entering={FadeInRight.delay(50).duration(245)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
              keyExtractor={(item, index) => `${item.key}${index}`}
              data={brandData?.data}
              renderItem={({ item }) => <Brand item={item} />}
              maxToRenderPerBatch={5}
              initialNumToRender={5}
              windowSize={10}
              removeClippedSubviews
            />
          )}

          {/* Custom Carousel */}
          {carouselLoading ? <Carousel_Skeleton /> : <Carousel />}

          {/* Offer Cart Section */}
          <HomePageProductCateTitle title="Offer" subTitle="See All" />
          {sortedDataLoading ? (
            <Cart_Skeleton />
          ) : (
            // <ScrollView
            //   contentContainerStyle={{ paddingHorizontal: 10 }}
            //   showsHorizontalScrollIndicator={false}
            //   horizontal>
            //   {sortedData?.data?.map((item: IProduct, index: number) => (
            //     <OfferCart key={index?.toString()} item={item} />
            //   ))}
            <FlatList
              data={[]}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 10, flex: 1 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <OfferCart key={index?.toString()} item={item} />;
              }}
              ListEmptyComponent={<EmptyData width={90} height={90} children="No Offer Cart" />}
            />
          )}

          {/* All Cart Section */}
          <HomePageProductCateTitle title="Printers, Cartridge, Ink" subTitle="See All" />
          <View style={homePageStyle.cordContainer}>
            {loadingProduct ? (
              <Cart_Skeleton />
            ) : (
              <FlatList
                data={productData?.data}
                renderItem={renderItem}
                keyExtractor={(item: any, index) => `${item.key}${index}`}
                numColumns={2}
                contentContainerStyle={{ justifyContent: 'space-between' }}
                initialNumToRender={6}
                windowSize={10}
                maxToRenderPerBatch={6}
                removeClippedSubviews
                ListEmptyComponent={<EmptyData width={90} height={90} children="No Data" />}
              />
            )}
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    </View>
  );
};

export default memo(Home);
