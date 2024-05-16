import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { addToCartStyle } from './AddToCartStyle';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from 'react-native-paper';
import ProgressBar from '../progressbar/ProgressBar';
import { IProduct } from '../../types/interfaces/product.interface';
import { mainUrl } from '../../constants/mainUrl';
import { Color, Font } from '../../constants/GlobalStyle';
import { ICartData } from '../../pages/productDetailsPage/ProductDetails';
import { useGetCart, useUpdateCart } from '../../hooks/allHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../customLoader/CustomLoader';
import { CartItemContext } from '../../Providers/CartItemProvider';
import { formatExistingCart } from '../../helpers/product/formatCart';

const AddToCart = ({ item }: { item: any }) => {
  const { cart: cartData, setCart: setCartData } = useContext(CartItemContext);
  const [accessToken, setAccessToken] = useState<string>('');
  const [indicator, setIndicator] = useState(false);
  const { updateCart } = useUpdateCart();
  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  let totalPercentage;

  if (item.bulk && (item.bulk.minOrder === 0 || item.bulk.minOrder <= item.orderQuantity)) {
    totalPercentage = (item.variant.discountPercentage || 0) + (item.bulk.discount || 0);
  } else if (item.variant.discountPercentage) {
    totalPercentage = item.variant.discountPercentage;
  }

  let totalPrice;

  if (item && item?.variant && item?.variant?.discountedPrice) {
    totalPrice = item?.variant?.discountedPrice;
  } else {
    totalPrice = item?.variant?.sellingPrice;
  }

  let discountedPrice: number = 0;

  if (item?.bulk?.discount) {
    const discountPercent = item?.bulk?.discount;
    const minOrder = item?.bulk?.minOrder;
    const discountAmount = totalPrice * (discountPercent / 100);
    if (item?.orderQuantity >= minOrder) {
      discountedPrice = totalPrice - discountAmount;
    } else {
      discountedPrice = totalPrice;
    }
  } else {
    discountedPrice = totalPrice;
  }

  // Using useEffect to update the grand total price whenever discountedPrice changes

  // Function to format existing cart data

  // Function to handle adding to cart
  const handleCartItem = async (
    action: string,
    product: IProduct & { productId: string; variant: { variantName: string } }
  ) => {
    const isAlreadyExistItem = cartData?.data?.products?.find(
      (item: any) =>
        item.productId === product?.productId &&
        item?.variant?.variantName === product?.variant?.variantName
    );

    const isAlreadyExistIndex = cartData?.data?.products?.findIndex(
      (item: any) =>
        item?.productId === product?.productId &&
        item?.variant?.variantName === product?.variant?.variantName
    );

    let updateData = cartData?.data?.products;
    if (isAlreadyExistIndex === -1) {
      return;
    } else {
      if (action === 'increament') {
        updateData = [
          ...formatExistingCart(cartData?.data?.products.slice(0, isAlreadyExistIndex)),
          {
            ...product,
            productId: product?.productId,
            variantName: product?.variant?.variantName,
            orderQuantity: isAlreadyExistItem?.orderQuantity + 1,
          },
          ...formatExistingCart(cartData?.data?.products?.slice(isAlreadyExistIndex + 1)),
        ];
        // setRefetch((prev) => prev + 1);
      }

      if (action === 'decreament') {
        if (isAlreadyExistItem?.orderQuantity > 1) {
          // Check if quantity is greater than 1
          updateData = [
            ...formatExistingCart(cartData?.data?.products.slice(0, isAlreadyExistIndex)),
            {
              ...product,
              productId: product?.productId,
              variantName: product?.variant?.variantName,
              orderQuantity: isAlreadyExistItem?.orderQuantity - 1,
            },
            ...formatExistingCart(cartData?.data?.products?.slice(isAlreadyExistIndex + 1)),
          ];
        } else {
          return;
        }
      }
      // remove a product from cart
      if (action === 'removeItem') {
        updateData = [
          ...formatExistingCart(cartData?.data?.products.slice(0, isAlreadyExistIndex)),
          ...formatExistingCart(cartData?.data?.products?.slice(isAlreadyExistIndex + 1)),
        ];
      }
    }

    setCartData({ data: { ...cartData?.data, products: updateData } });
    // api request
    updateCart({ products: updateData });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(500)}
      style={addToCartStyle.cartContainer}
    >
      {item?.variant?.discountPercentage && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(200, 59, 98, 0.15)', 'rgba(127, 53, 205, 0.15)']}
          style={addToCartStyle.discountCon}
        >
          <Text style={addToCartStyle.discountParcent}>{totalPercentage}%</Text>
        </LinearGradient>
      )}
      <TouchableOpacity
        onPress={() => {
          handleCartItem('removeItem', item);
        }}
        style={addToCartStyle.close}
      >
        <AntDesign name="close" size={20} color="black" />
      </TouchableOpacity>
      <View style={addToCartStyle.productDescAndOthers}>
        <View style={addToCartStyle.imgCon}>
          <Image style={addToCartStyle.img} source={{ uri: `${mainUrl}${item?.productPhoto}` }} />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View style={addToCartStyle.titleCon}>
              <Text numberOfLines={2} style={addToCartStyle.title}>
                {item?.productName}
              </Text>
            </View>
          </View>
          <View style={addToCartStyle.storeNameAndColorIndicator}>
            <View style={addToCartStyle.colorCon}>
              <View
                style={[
                  addToCartStyle.colorIndicator,
                  { backgroundColor: item?.variant?.variantName.toLowerCase() },
                ]}
              />
              <Text style={[addToCartStyle.storeName, { marginRight: 10 }]}>
                {item?.variant?.variantName}
              </Text>
            </View>
            <Text style={addToCartStyle.stick}>|</Text>
            <Text style={addToCartStyle.storeName}>{item?.brandName}</Text>
          </View>
          <View style={addToCartStyle.currencyCon}>
            <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
              <Text style={addToCartStyle.priceAndCurrency}>
                {discountedPrice}{' '}
                <Text style={{ fontSize: Font.Font_M, fontWeight: '400' }}>QAR</Text>
              </Text>
              <Text
                style={[
                  addToCartStyle.priceAndCurrency,
                  {
                    color: Color.C_H_black,
                    fontSize: Font.Font_M,
                    fontWeight: '400',
                    textDecorationLine: 'line-through',
                  },
                ]}
              >
                {item?.variant?.sellingPrice} QAR
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleCartItem('decreament', item);
                }}
                style={addToCartStyle.plusAndMinus}
              >
                <AntDesign name="minus" size={16} color="black" />
              </TouchableOpacity>
              <Text style={addToCartStyle.quantity}>{item?.orderQuantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleCartItem('increament', item);
                }}
                style={addToCartStyle.plusAndMinus}
              >
                <AntDesign name="plus" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {item?.bulk?.discount >= 0 && (
        <View style={addToCartStyle.progressBarConStyle}>
          <Divider style={addToCartStyle.divider} />
          <ProgressBar item={item} />
        </View>
      )}
      <CustomLoader indicator={indicator} setIndicator={setIndicator} />
    </Animated.View>
  );
};

export default AddToCart;
