/*
   This component represents the product details screen. It displays information about a specific product,
   such as images, descriptions, related products, and options for adding to cart or buying.

   It fetches product data from the API and manages state for selected variants, quantity, and favorites.
*/

// Importing necessary dependencies and components
import { MaterialIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Badge } from 'react-native-paper';
import Animated, {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { productDetailsStyle } from './ProductDetailsStyle';
import { CartBag, FavIcon, Goback } from '../../../assets/allSvg/AllSvg';
import { CartItemContext } from '../../Providers/CartItemProvider';
import { FavItemContext } from '../../Providers/FavItemProvider';
import RelatedProduct from '../../components/card/relatedProduct/relatedProduct';
import ProductDetailsDesc from '../../components/productDetailsDesc/ProductDetails.description';
import { Color } from '../../constants/GlobalStyle';
import { mainUrl } from '../../constants/mainUrl';
import { formatExistingCart } from '../../helpers/product/formatCart';
import { useGetProductById, useProductQuery, useUpdateCart } from '../../hooks/allHooks';
import CustomTab from '../../routes/material_Tab/CustomTab';
import { IProduct } from '../../types/interfaces/product.interface';
import ProductImageSkeleton from '~/components/skeleton/productDetailsSkeleton/ProductImage.skeleton';
import DetailsSkeleton from '~/components/skeleton/productDetailsSkeleton/DetailsSkeleton';
import { SafeAreaView } from 'react-native-safe-area-context';
// Interface for cart data
export interface ICartData {
  productId: string;
  variant: { variantName: string };
  orderQuantity: number;
}

const cartWidth = Dimensions.get('window').width;

const ProductDetails: React.FC<IProduct> = (props) => {
  //@ts-ignore
  const productId = props?.route?.params;
  const id = productId?.productId || productId?.itemId || productId?.FavProductId;
  const { data, setRefetch } = useGetProductById(id);
  const productData = data?.data;
  const { cart: cartData, setCart } = useContext(CartItemContext);
  const { data: relatedProduct } = useProductQuery(
    `brand.brandName=${productData?.brand?.brandName}`
  );

  const navigation: any = useNavigation();
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  // const [addFavorite, setAddFavorite] = useState(false);
  const screenHeight: number = Dimensions.get('screen')?.height;
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isFavItem, setIsFavItem] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const { updateCart } = useUpdateCart();
  const [refreshing, setRefreshing] = useState(false);
  const animatedY = useSharedValue(0);
  const animatedX = useSharedValue(0);
  const scale = useSharedValue(0);
  const scale2 = useSharedValue(0);

  const favCtxValue = useContext(FavItemContext);

  // check is the product already added to the favourite list
  useEffect(() => {
    if (favCtxValue && 'data' in favCtxValue) {
      setIsFavItem(
        !!favCtxValue.data?.data?.products?.find((p: { productId: string }) => p?.productId === id)
      );
    }
  }, [favCtxValue]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);

  // Function to scroll to top of the screen
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // Source page for tracking
  const sourcePage = 'ProductDetailsPage';

  // Function to format existing cart data

  // Effect to set default selected variant
  useEffect(() => {
    if (!selectedVariant) {
      setSelectedVariant(
        productData?.variants?.find((variant: any) => variant?.isDefault === true)
      );
    }
  }, [selectedVariant, productData?.variants]);

  // Function to handle adding to cart
  const handleAddToCart = async (product: IProduct) => {
    // Ensure selectedVariant is updated before proceeding
    const productPhoto = product?.productPhotos?.length && product?.productPhotos[0];
    const variant = product?.variants?.find((v) => v.variantName === selectedVariant?.variantName);

    if (!selectedVariant) return;
    let updateData;
    if (cartData?.data) {
      const isAlreadyExistItem = cartData?.data?.products?.find(
        (item: any) =>
          item.productId === product?._id &&
          item?.variant?.variantName === selectedVariant?.variantName
      );

      const isAlreadyExistIndex = cartData?.data?.products?.findIndex(
        (item: any) =>
          item.productId === product?._id &&
          item?.variant?.variantName === selectedVariant?.variantName
      );

      if (isAlreadyExistIndex === -1) {
        updateData = [
          ...formatExistingCart(cartData?.data?.products),
          {
            ...product,
            productPhoto,
            variant,
            productId: product?._id,
            variantName: selectedVariant?.variantName,
            orderQuantity: 1,
          },
        ];
      } else {
        updateData = [
          ...formatExistingCart(cartData?.data?.products.slice(0, isAlreadyExistIndex)),
          {
            ...product,
            productPhoto,
            variant,
            productId: product?._id,
            variantName: selectedVariant?.variantName,
            orderQuantity: isAlreadyExistItem?.orderQuantity + 1,
          },
          ...formatExistingCart(cartData?.data?.products?.slice(isAlreadyExistIndex + 1)),
        ];
      }
    } else {
      updateData = [
        {
          ...product,
          productPhoto,
          variant,
          productId: product?._id,
          variantName: selectedVariant?.variantName,
          orderQuantity: 1,
        },
      ];
    }

    setCart({ data: { ...cartData?.data, products: updateData } });
    // add debounce functionality

    updateCart({ products: updateData });
  };

  // Function to add or remove from favorites
  const addRemoveFavorite = async (product: any, selectedVariant: any) => {
    setLoader(true);
    let updateData;
    if (favCtxValue && 'data' in favCtxValue && 'setRefetch' in favCtxValue) {
      const isAlreadyExistIndex = favCtxValue.data?.data?.products.findIndex(
        (p: any) => p.productId === product._id
      );
      if (favCtxValue.data?.data) {
        if (isAlreadyExistIndex !== -1) {
          updateData = [
            ...favCtxValue.data?.data?.products.slice(0, isAlreadyExistIndex),
            ...favCtxValue.data?.data?.products.slice(isAlreadyExistIndex + 1),
          ];
        } else {
          updateData = [
            ...favCtxValue.data?.data?.products,
            {
              productId: product?._id,
              variantName: selectedVariant?.variantName,
            },
          ];
        }
      } else {
        updateData = [
          {
            productId: product?._id,
            variantName: selectedVariant?.variantName,
          },
        ];
      }
      const response = await fetch('https://api.theqprint.com/api/v1/wishlist/add', {
        method: 'POST',
        body: JSON.stringify({ products: updateData }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      favCtxValue.setRefetch((prev) => prev + 1);
      setLoader(false);
    }
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: animatedX.value },
        { translateY: animatedY.value },
        { scale: scale.value },
      ],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale2.value }],
    };
  });

  // Effect to remove skeleton after delay
  useEffect(() => {
    setTimeout(() => {
      setIsSkeleton(false);
    }, 1000);
  }, []);

  // Function to increase quantity for animation
  const animatedCartCounter = () => {
    if (animatedX.value === 0) {
      scale.value = 1;
      animatedY.value = withTiming(-770, { duration: 500 });
      animatedX.value = withTiming(30, { duration: 500 });
      setTimeout(() => {
        scale.value = 0;
        scale2.value = withSpring(1.5);
        animatedY.value = withTiming(0, { duration: 500 });
        animatedX.value = withTiming(0, { duration: 500 });
        setTimeout(() => {
          scale2.value = withSpring(1);
        }, 150);
      }, 500);
    }
  };

  // Filter related products data
  const filterRelatedData = relatedProduct?.data?.filter(
    (product: any) => product?._id !== productData?._id
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setRefreshing(false);
  };
  // Return JSX

  console.log(selectedVariant);

  return (
    <SafeAreaView style={{ height: screenHeight }}>
      <View style={productDetailsStyle.navigationAndFavCon}>
        <Animated.View entering={FadeInLeft.duration(500).delay(50)}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={productDetailsStyle.navAndFav}>
            <Goback />
          </TouchableOpacity>
        </Animated.View>
        <View style={productDetailsStyle.favAndCartCon}>
          <Animated.View entering={FadeInRight.duration(500).delay(50)}>
            {cartData?.data === null ? null : (
              <TouchableOpacity onPress={() => navigation.navigate('MyCart')} activeOpacity={0.7}>
                <CartBag />
                <Badge style={{ position: 'absolute', top: -12, right: -5 }}>
                  {cartData?.data?.products?.length}
                </Badge>
                <Animated.View style={[productDetailsStyle.badge, animatedStyle2]}>
                  {cartData?.data?.products?.length ? (
                    <Text style={productDetailsStyle.badgeText}>
                      {cartData?.data?.products?.length}
                    </Text>
                  ) : (
                    <Text>0</Text>
                  )}
                </Animated.View>
              </TouchableOpacity>
            )}
          </Animated.View>
          <Animated.View entering={FadeInRight.duration(500).delay(50)}>
            <TouchableOpacity
              onPress={() => {
                // ======================================
                addRemoveFavorite(productData, selectedVariant);
              }}
              activeOpacity={0.7}
              style={productDetailsStyle.navAndFav}>
              {isFavItem ? (
                <MaterialIcons name="favorite" size={20} color={Color.C_main} />
              ) : loader ? (
                <Feather name="loader" size={20} color="black" />
              ) : (
                <FavIcon />
              )}
              {/* <FavIcon /> */}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ref={scrollViewRef}>
        <Animated.View style={[productDetailsStyle.imageAndNavContainer]}>
          <Animated.View>
            {/* ============================================ */}
            {/* ============================================ */}

            {productData?.productPhotos ? (
              <FlatList
                horizontal
                pagingEnabled
                onScroll={(event) => {
                  const contentOffsetX = event.nativeEvent.contentOffset.x;
                  const currentIndex = Math.round(contentOffsetX / cartWidth);
                  setCurrentIndex(currentIndex);
                }}
                showsHorizontalScrollIndicator={false}
                style={{ height: 280, width: '100%' }}
                data={productData?.productPhotos}
                renderItem={({ item: img }) => {
                  return (
                    <Animated.Image
                      source={{ uri: `${mainUrl}${img}` }}
                      // onError={}
                      style={{
                        width: cartWidth,
                        height: 280,
                        alignSelf: 'center',
                        resizeMode: 'cover',
                      }}

                      // Add any other styles or animations as needed
                    />
                  );
                }}
              />
            ) : (
              <ProductImageSkeleton />
            )}
          </Animated.View>
        </Animated.View>
        {/* price and quantity container */}
        {/* product details container here*/}
        {/* ================================================ */}
        {/* ================================================ */}
        {productData ? (
          <ProductDetailsDesc
            data={productData}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            quantity={quantity}
            setQuantity={setQuantity}
            currentIndex={currentIndex}
          />
        ) : (
          <DetailsSkeleton />
        )}
        {/* view more information container */}
        {/* ================================================ */}
        {/* ================================================ */}
        <CustomTab item={productData} />
        {/* ================================================ */}
        <View style={productDetailsStyle.realatedProductCon}>
          <ScrollView
            contentContainerStyle={{ paddingRight: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {filterRelatedData?.map((item: IProduct) => {
              return <RelatedProduct item={item} scrollToTop={scrollToTop} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>
      {/*
      related products
      ==================
      */}

      {/* 
related product ends here
========================
*/}
      {/* fixed buy now button and price */}
      <View
        style={[
          productDetailsStyle.BuyNowButtonAndAddToCartCon,
          { height: productData?.bulk?.minOrder ? 138 : 100 },
        ]}>
        {productData?.bulk?.discount && (
          <View style={productDetailsStyle.offerPercentCon}>
            <Text>
              Order{' '}
              <Text style={{ color: Color.C_main, fontWeight: '600' }}>
                {productData?.bulk?.minOrder}
              </Text>{' '}
              item to get off{' '}
              <Text style={{ fontWeight: '600', color: Color.C_black }}>
                {productData?.bulk?.discount}% Extra!
              </Text>
            </Text>
          </View>
        )}
        <View style={productDetailsStyle.buyButtonAndCartCon}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#C83B62', '#7F35CD']}
            style={productDetailsStyle.linearButton}>
            <TouchableOpacity
              onPress={() => {
                let selectedVar;
                if (selectedVariant) {
                  selectedVar = selectedVariant;
                } else {
                  selectedVar = productData?.variants?.find(
                    (variant: any) => variant?.isDefault === true
                  );
                }

                navigation.navigate('Summery', {
                  ...productData,
                  variant: selectedVar,
                  quantity,
                  source: sourcePage,
                });
              }}
              style={productDetailsStyle.buyButton}>
              <Text style={productDetailsStyle.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={selectedVariant?.inStock <= 0 ? true : false}
            onPress={() => {
              handleAddToCart(productData);
              animatedCartCounter();
            }}
            style={productDetailsStyle.cartButton}>
            <Text style={productDetailsStyle.addTorCartText}>Add To Cart</Text>
            <CartBag />
          </TouchableOpacity>
          <Animated.View style={[productDetailsStyle.quantityAnimCon, animatedStyle]}>
            <Text style={productDetailsStyle.badgeText}>+1</Text>
          </Animated.View>
        </View>
      </View>
      <StatusBar style="dark" backgroundColor="#F8F3FB" />
    </SafeAreaView>
  );
};

export default ProductDetails;
