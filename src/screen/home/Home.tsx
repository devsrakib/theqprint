import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Color } from '../../constants/GlobalStyle';
import HomePageTopCon from '../../components/homePageTopCon/HomePageHeader';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { homePageStyle } from './HomePageStyle';
import { Magnify } from '../../../assets/allSvg/AllSvg';
import Carousel from '../../components/carousel/Carousel';
import OfferCart from '../../components/card/offeredCart/OfferCart';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Brand from '../../components/brandInHome/Brand';
import HomePageProductCateTitle from '../../components/common/homePageProductCategory/HomePageProductCateTitle';
import { IProduct } from '../../types/interfaces/product.interface';
import Cart from '../../components/card/allCart/Cart';
import Brand_Skeleton from '../../components/skeleton/Home.Brand_Skeleton';
import Carousel_Skeleton from '../../components/skeleton/Carousel_Skeleton';
import Cart_Skeleton from '../../components/skeleton/Cart_SkeletonInHome';
// import NetworkStatus from '../../pages/internet/NoInternet';
import {
  useBrand,
  useCarousel,
  useGetCart,
  useProduct,
  useSortedProduct,
} from '../../hooks/allHooks';
import { CartItemContext } from '../../Providers/CartItemProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkStatus from '~/pages/internet/NoInternet';

const Home = () => {
  const navigation: any = useNavigation();
  const { cart, setCart } = useContext(CartItemContext);
  const [isHomeScreenActive, setIsHomeScreenActive] = useState(true);
  const { data: brandData, isLoading } = useBrand();
  // const { data: brandData, isLoading: isBrandLoading } = useGetBrandQuery(undefined);
  const { data: productData, isLoading: loadingProduct } = useProduct();
  const { data: carouselData, isLoading: carouselLoading } = useCarousel();
  const { data: sortedData, isLoading: sortedDataLoading } = useSortedProduct();

  // const { data: cartData } = useContext(CartItemContext);
  const { data: cartData } = useGetCart();

  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  const renderItem = ({ item }: any) => (
    <View style={homePageStyle.itemContainer}>
      <Cart item={item} />
    </View>
  );

  const handleBackPress = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [])
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

          {/* Brand_Skeleton */}
          {isLoading ? (
            <Brand_Skeleton />
          ) : (
            <Animated.FlatList
              entering={FadeInRight.delay(50).duration(245)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
              keyExtractor={(item, index) => `${item.key}${index}`}
              data={brandData?.data}
              renderItem={({ item }) => {
                return <Brand item={item} />;
              }}
            />
          )}
          {/* Custom Carousel */}
          {carouselLoading ? <Carousel_Skeleton /> : <Carousel />}
          {/* Offer Cart Section */}
          <HomePageProductCateTitle title="offer" subTitle="see all" />
          {sortedDataLoading ? (
            <Cart_Skeleton />
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal>
              {sortedData?.data?.map((item: IProduct, index: number) => {
                return <OfferCart key={index?.toString()} item={item} />;
              })}
            </ScrollView>
          )}
          {/* Cart_Skeleton */}

          {/* All Cart Section */}
          <HomePageProductCateTitle title="Printers, Cartridge, Ink" subTitle="see all" />
          <View style={homePageStyle.cordContainer}>
            {/* Renders the title and subtitle */}
            {/* Maps over the data and renders individual Cart components */}
            {/* {productData?.data?.map((item: IProduct, index: number) => {
              return <Cart key={index?.toString()} item={item} />;
            })} */}
            <FlatList
              data={productData?.data}
              renderItem={renderItem}
              keyExtractor={(item: any, index) => `${item.key}${index}`}
              numColumns={2}
              contentContainerStyle={{ justifyContent: 'space-between' }}
            />
          </View>
          {/* Cart_Skeleton */}
        </ScrollView>
        {/* StatusBar */}
        <StatusBar style="dark" />
      </View>
      <NetworkStatus />
    </View>
  );
};

export default Home;
