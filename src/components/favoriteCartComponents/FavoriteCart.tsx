import { View, Text, Image, TouchableOpacity, ViewToken } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { favoriteCartStyle } from './FavoriteCartStyle';
import { CartBag, RedClose } from '../../../assets/allSvg/AllSvg';
import Animated, { FadeInDown, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAppDispatch } from '../../redux/hook';
import { removeFromFavorite } from '../../redux/features/addFavourite';
import { addToCart } from '../../redux/features/cartSlice';
import { mainUrl } from '../../constants/mainUrl';
import { useGetFavourite, useGetProductById } from '../../hooks/allHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavItemContext } from '../../Providers/FavItemProvider';
import CustomLoader from '../customLoader/CustomLoader';
import { CustomTouchable } from '../../shared/CustomTouchable';
import { useNavigation } from '@react-navigation/native';

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: any;
};

// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const FavoriteCart: React.FC<ListItemProps> = ({ item, viewableItems }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const { data } = useGetProductById(item?.productId);
  const { data: favoriteData, setRefetch } = useGetFavourite();
  const [indicator, setIndicator] = useState(false);
  const nagivation = useNavigation<any>();
  const favCtxValue = useContext<any>(FavItemContext);

  const defaultVar = data?.data?.variants?.find((i: any) => i?.isDefault === true);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item?.isViewable)
        .find((viewableItems) => viewableItems?.item?.id === item?.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0.7),
      transform: [
        {
          scaleX: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  // const addRemoveFavorite = async (product: any) => {
  //   const isAlreadyExistIndex = favoriteData?.data?.products?.findIndex(
  //     (p: any) => p.productId === product.productId
  //   );

  //   let updateData;

  //   if (favoriteData?.data && isAlreadyExistIndex !== -1) {
  //     updateData = [
  //       ...favoriteData?.data?.products.slice(0, isAlreadyExistIndex),
  //       ...favoriteData?.data?.products.slice(isAlreadyExistIndex + 1),
  //     ];
  //   }

  //   console.log(isAlreadyExistIndex, product._id);

  //   const response = await fetch('https://api.theqprint.com/api/v1/wishlist/add', {
  //     method: 'POST',
  //     body: JSON.stringify({ products: updateData }),
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const result = await response.json();
  //   console.log(result);

  //   setRefetch((prev) => prev + 1);
  // };

  // useEffect(() => {
  //   setRefetch((prev) => prev + 1);
  // }, [favoriteData]);

  const addRemoveFavorite = async (product: any) => {
    setIndicator(true);
    try {
      const isAlreadyExistIndex = favCtxValue?.data?.data?.products?.findIndex(
        (p: any) => p.productId === product.productId
      );

      let updateData;
      if (favCtxValue && 'setRefetch' in favCtxValue) {
        if (favCtxValue?.data?.data?.products && isAlreadyExistIndex !== -1) {
          updateData = [
            ...favCtxValue?.data?.data?.products?.slice(0, isAlreadyExistIndex),
            ...favCtxValue?.data?.data?.products?.slice(isAlreadyExistIndex + 1),
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
        const result = await response.json();
        setRefetch((prev) => prev + 1);
        favCtxValue.setRefetch((prev: any) => prev + 1);
      }

      // setRefetch((prev) => prev + 1);
    } catch (error) {
    } finally {
      setIndicator(false);
    }
  };

  return (
    <CustomTouchable
      entering={FadeInDown.delay(50).duration(500)}
      style={[favoriteCartStyle.container]}
      onPress={() => nagivation.navigate('ProductDetails', { FavProductId: data?.data?._id })}>
      <View style={favoriteCartStyle.itemCon}>
        <View style={favoriteCartStyle.imgCon}>
          <Image
            style={favoriteCartStyle.img}
            source={{ uri: `${mainUrl}${item?.productPhoto}` }}
          />
          <TouchableOpacity onPress={() => addRemoveFavorite(item)} style={favoriteCartStyle.close}>
            <RedClose />
          </TouchableOpacity>
        </View>
        <View style={favoriteCartStyle.allText}>
          <View>
            <Text style={favoriteCartStyle.brandSpecTitle}>{item?.productName}</Text>
            <Text style={favoriteCartStyle.ratingText}>{item?.rating}</Text>
          </View>
          <View style={favoriteCartStyle.currencyAndButtonCon}>
            <Text style={favoriteCartStyle.currency}>{defaultVar?.discountedPrice} QAR</Text>
            {/* <TouchableOpacity activeOpacity={0.7} style={favoriteCartStyle.addToCartButton}>
              <CartBag />
              <Text style={favoriteCartStyle.buttonText}>Add</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
      <CustomLoader indicator={indicator} setIndicator={setIndicator} />
    </CustomTouchable>
  );
};

export default FavoriteCart;
