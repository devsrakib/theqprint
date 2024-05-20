/**
 * MyCart Component Comment:
 *
 * This component serves as the shopping cart screen in the application. It displays a list of items added to the cart,
 * the total price, a progress bar indicating the amount spent towards free shipping, and a button to proceed to checkout.
 * Additionally, it includes an animated congratulatory message upon reaching the target amount for free shipping.
 *
 * State:
 * - subTatal: Represents the current total amount in the cart.
 * - targetAmount: Represents the target amount for free shipping.
 * - percentageProgress: Calculates the percentage progress towards the target amount.
 * - animatedProgress: Shared value for animated progress bar.
 *
 * Navigation:
 * - navigation: React Navigation hook used for navigation between screens.
 *
 * Usage Example:
 * ```jsx
 * import MyCart from './MyCart';
 * <MyCart />
 * ```
 */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AddToCart from '../../components/addToCart/AddToCart';
import { BackArrow } from '../../../assets/allSvg/AllSvg';
import { myCartStyle } from './MyCartStyle';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { commonHeaderStyle } from '../../components/common/commonHeader/CommonHeaderStyle';
import { Color } from '../../constants/GlobalStyle';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGetCart, useGetDeliveryState } from '../../hooks/allHooks';
import { CartItemContext } from '../../Providers/CartItemProvider';
import EmptyData from '~/components/common/EmptyData';
const MyCart = () => {
  const navigation: any = useNavigation();
  const [isLottie, setIsLottie] = useState<boolean>(true);
  const [shouldPlayLottie, setShouldPlayLottie] = useState<boolean>(true);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const { data, setRefetch: progressRefetch } = useGetDeliveryState();
  const mycartOrderItem = 'myCartOrderItem';

  const { cart: cartData } = useContext(CartItemContext);
  // useEffect(() => {
  //   setRefetch((prev) => prev + 1);
  // }, []);
  const animation = useRef<any>(null);
  const targetedAmount = data?.data?.freeShippingMinOrderAmount;
  const percentageProgress =
    discountedTotal === 0 ? 0 : Math.round((discountedTotal / targetedAmount) * 100);
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    const percentage = Math.min(100, Math.round((discountedTotal / targetedAmount) * 100));
    animatedProgress.value = withTiming(percentage / 100, { duration: 1000 });
    progressRefetch((prev) => prev + 1);
  }, [discountedTotal, targetedAmount]);
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
      height: 5,
      backgroundColor: Color.C_main,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      position: 'relative',
    };
  });

  // const productPriceArray = cartData?.data?.products?.map((product: any) => {
  //   let payablePrice = product?.variant?.discountedPrice || product?.variant?.sellingPrice;
  //   if (
  //     product?.bulk &&
  //     (product?.bulk?.minOrder === 0 || product?.bulk?.minOrder <= product?.orderQuantity)
  //   ) {
  //     const bulkDiscountAmount = (payablePrice * product?.bulk?.discount) / 100;
  //     payablePrice = payablePrice - bulkDiscountAmount;
  //   }
  //   return payablePrice * product?.orderQuantity;
  // });

  const productPriceArray = cartData?.data?.products?.map((product: any) => {
    let payablePrice = product?.variant?.discountedPrice || product?.variant?.sellingPrice;
    if (
      product?.bulk &&
      (product?.bulk?.minOrder === 0 || product?.bulk?.minOrder <= product?.orderQuantity)
    ) {
      const bulkDiscountAmount = (payablePrice * product?.bulk?.discount) / 100;
      payablePrice = bulkDiscountAmount ? payablePrice - bulkDiscountAmount : payablePrice;
    }
    const totalPrice = payablePrice * product?.orderQuantity;

    // Handle the case where totalPrice is NaN or Infinity
    if (isNaN(totalPrice) || !isFinite(totalPrice)) {
      return 0;
    }
    return totalPrice;
  });
  console.log(productPriceArray);

  const originalPrice = cartData?.data?.products?.map((product: any) => {
    // setOrderQuantity(product?.orderQuantity)
    let orgPrice = product?.variant?.sellingPrice;
    return orgPrice * product?.orderQuantity;
  });
  const orderQuantity = cartData?.data?.products?.map((product: any) => {
    return product?.orderQuantity || 0; // Return 0 if orderQuantity is undefined or null
  });
  const totalOrderQuantity = orderQuantity?.reduce((acc: number, curr: number) => acc + curr, 0);

  useEffect(() => {
    setDiscountedTotal(
      productPriceArray?.reduce((total: number, price: number) => total + price, 0)
    );
  }, [cartData, discountedTotal]);

  useEffect(() => {
    setOriginalTotalPrice(
      originalPrice?.reduce((total: number, price: number) => total + price, 0)
    );
  }, [originalPrice]);

  useEffect(() => {
    if (shouldPlayLottie) {
      setTimeout(() => {
        animation.current?.play();
        setShouldPlayLottie(false);
      }, 200);
    }
  }, [shouldPlayLottie]);

  useEffect(() => {
    setTimeout(() => {
      setIsLottie(false);
    }, 2500);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Common Header Container */}
      <View style={commonHeaderStyle.container}>
        <View style={commonHeaderStyle.titleCon}>
          <TouchableOpacity
            style={commonHeaderStyle.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={commonHeaderStyle.title}>My Cart</Text>
        </View>
      </View>

      {/* FlatList to render cart items */}
      {/* {products?.length === 0 ? (
        <EmptyData children="no cart" />
      ) : ( */}
      {cartData?.data?.products?.length === 0 ? (
        <EmptyData children="No cart" />
      ) : (
        <Animated.FlatList
          data={cartData?.data?.products}
          renderItem={({ item }: any) => {
            return <AddToCart item={item} />;
          }}
        />
      )}
      {/* )} */}

      {/* Total price, progress bar, free shipping information, and proceed to checkout button */}
      {cartData?.data?.products?.length !== 0 && (
        <View style={myCartStyle.totalPriceAndProgressCon}>
          {/* Display the grand total */}
          <View style={myCartStyle.grandTotalCon}>
            <Text>Grand Total</Text>
            <Text>
              {discountedTotal?.toFixed(2)} <Text>QAR</Text>
            </Text>
          </View>

          {/* Display the progress bar */}
          <View style={{ position: 'relative' }}>
            <View style={myCartStyle.customProgressBG}>
              <Animated.View style={progressStyle}>
                <View style={myCartStyle.percentageValueCon}>
                  {discountedTotal >= targetedAmount ? (
                    <Text style={{ fontSize: 12 }}>100</Text>
                  ) : (
                    <Text style={{ fontSize: 12 }}>{percentageProgress}</Text>
                  )}
                </View>
              </Animated.View>
            </View>
          </View>

          {/* Display information about free shipping */}
          {discountedTotal >= targetedAmount ? (
            <View style={myCartStyle.congratsMessageCon}>
              <AntDesign name="checkcircleo" size={16} color={Color.C_green} />
              <Text style={myCartStyle.congratsText}>Congratulation! You got free shipping</Text>
            </View>
          ) : (
            <Text style={myCartStyle.freeShippingText}>
              Spend <Text style={{ color: '#C83B62', fontWeight: '600' }}>{targetedAmount}</Text>{' '}
              more to reach <Text style={{ color: '#000' }}>FREE SHIPPING!</Text>
            </Text>
          )}

          {/* Display the button to proceed to checkout */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#C83B62', '#7F35CD']}
            style={myCartStyle.linearContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('Summery', {
                  ...cartData,
                  source: 'ProductDetailsPage',
                  source2: 'AllCartRemove',
                  CartItem: mycartOrderItem,
                  originalTotalPrice: originalTotalPrice,
                  discountedTotal: discountedTotal,
                  orderQuantity: totalOrderQuantity,
                })
              }
              style={myCartStyle.proceedButton}>
              <Text style={myCartStyle.proceedText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

      {/* Display the congratulation lottie */}
      {discountedTotal >= targetedAmount && (
        <View style={myCartStyle.lottieConStyle}>
          {isLottie && (
            <LottieView
              loop={false}
              autoPlay
              ref={animation}
              source={require('../../../assets/image/cong3.json')}
              style={myCartStyle.lottieStyle}
            />
          )}
        </View>
      )}
      <StatusBar style="dark" />
    </View>
  );
};

export default MyCart;
