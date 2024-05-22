import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, Font, shadows } from '../../constants/GlobalStyle';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { InActiveIndicator } from '../../../assets/allSvg/AllSvg';
import { LinearGradient } from 'expo-linear-gradient';
import { IProduct } from '../../types/interfaces/product.interface';
import { mainUrl } from '../../constants/mainUrl';
import { AntDesign } from '@expo/vector-icons';

const ProductDetailsDesc = ({
  data,
  selectedVariant,
  setSelectedVariant,
  quantity,
  currentIndex,
  setProductImages,
  productImages,
}: {
  data: IProduct;
  selectedVariant: any;
  setSelectedVariant: Function;
  quantity: number;
  setQuantity: Function;
  currentIndex: number;
  setProductImages: Function;
  productImages: any;
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<number | undefined>(undefined);

  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant);
    setSelectedVariantId(variant?._id);
    if (variant?.variantPhotos?.length > 0) {
      setProductImages([...variant.variantPhotos]);
    } else {
      setProductImages(data?.productPhotos || []);
    }
  };
  // console.log(data?.productPhotos);

  useEffect(() => {
    if (selectedVariant) {
      setSelectedVariantPrice(
        selectedVariant.discountedPrice !== undefined
          ? selectedVariant.discountedPrice
          : selectedVariant.sellingPrice
      );
    } else {
      const defaultVariant = data?.variants?.find((variant) => variant.isDefault);
      if (defaultVariant) {
        setSelectedVariantPrice(
          defaultVariant.discountedPrice !== undefined
            ? defaultVariant.discountedPrice
            : defaultVariant.sellingPrice
        );
      }
    }
  }, [selectedVariant, data]);

  let selectedSellingPrice;
  if (selectedVariant) {
    selectedSellingPrice = selectedVariant?.sellingPrice;
  } else {
    selectedSellingPrice = data?.variants?.find((variant: any) => variant.isDefault)?.sellingPrice;
  }

  let disCountePercentage;
  if (selectedVariant) {
    disCountePercentage = selectedVariant?.discountPercentage;
  } else {
    disCountePercentage = data?.variants?.find(
      (variant: any) => variant.isDefault
    )?.discountPercentage;
  }

  let stokeAlert;
  if (selectedVariant) {
    stokeAlert = selectedVariant?.inStock;
  } else {
    stokeAlert = data?.variants?.find((variant: any) => variant.isDefault)?.inStock;
  }

  let percentage: number | string | undefined;
  if (quantity === data?.bulk?.minOrder) {
    //@ts-ignore
    percentage = disCountePercentage + data?.bulk?.discount;
  } else {
    percentage = disCountePercentage;
  }

  return (
    <View style={styles.description}>
      <View style={styles.paginationCon}>
        {productImages?.map((_: any, index: number) => {
          return (
            <View
              key={index.toString()}
              style={[
                { height: 5, marginHorizontal: 5, borderRadius: 10 },
                {
                  width: currentIndex === index ? 10 : 5,
                  backgroundColor: currentIndex === index ? Color.C_H_black : '#7F35CD',
                },
              ]}
            />
          );
        })}
      </View>

      <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.ratingContainer}>
        {stokeAlert > 0 ? (
          <View style={styles.inStockContainer}>
            <InActiveIndicator />
            <Text style={[styles.inStockText]}>In stock</Text>
          </View>
        ) : (
          <View style={styles.inStockContainer}>
            <Text style={[styles.inStockText, { color: Color.C_red }]}>stoke out</Text>
          </View>
        )}
        <Text style={styles.verticalDivider}>|</Text>
        <View style={styles.ratingText}>
          <AntDesign name="star" size={18} color="orange" />
          <Text style={styles.ratingNumber}>({data?.totalReview})</Text>
        </View>
        {disCountePercentage && (
          <>
            <Text style={styles.verticalDivider}>|</Text>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['rgba(200, 59, 98, 0.15)', 'rgba(127, 53, 205, 0.15)']}
              style={styles.discountTextCon}>
              <Text style={styles.discountPercent}>{percentage}% off</Text>
            </LinearGradient>
          </>
        )}
      </Animated.View>
      <Animated.Text
        entering={FadeInDown.delay(50).duration(500)}
        numberOfLines={2}
        style={styles.title}>
        {data?.productName}
      </Animated.Text>
      <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.productIdandDisc}>
        <View style={styles.brandLogoContainer}>
          <Image
            style={styles.brandLogo}
            source={{ uri: `${mainUrl}${data?.brand?.brandPhoto}` }}
          />
        </View>
        <Text style={styles.brandName}>{data?.brand?.brandName}</Text>
      </Animated.View>

      <View style={styles.colorIndicatorCon}>
        {data?.variants?.map((variant: any, index: any) => {
          return (
            <TouchableOpacity
              onPress={() => handleVariantSelect(variant)}
              key={index.toString()}
              style={[
                styles.colorIndicator,
                {
                  backgroundColor: variant?.variantName?.toLowerCase(),

                  borderColor:
                    variant?._id === selectedVariantId
                      ? '#ffe5e5'
                      : variant?.isDefault
                        ? Color.C_main
                        : '#e5e5e5',
                  borderWidth: variant?._id === selectedVariantId ? 5 : 2,
                },
              ]}
            />
          );
        })}
      </View>
      <Animated.View entering={FadeInDown.delay(50).duration(500)} style={styles.priceContainer}>
        {/* Display the selling price */}
        <Text style={styles.currentPrice}>
          {selectedVariantPrice} <Text style={styles.discountedCurrency}>QAR</Text>
        </Text>
        {/* Display the discounted price */}
        <Text style={styles.discountedPrice}>
          {selectedSellingPrice}{' '}
          <Text style={[styles.currency, { fontSize: Font.Font_S }]}>QAR</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

export default ProductDetailsDesc;

const styles = StyleSheet.create({
  description: {
    paddingVertical: 20,
    borderBottomColor: Color.C_border,
    marginBottom: 10,
    backgroundColor: Color.C_white,
    paddingHorizontal: 20,
  },
  paginationCon: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 10,
    marginBottom: 5,
    width: '100%',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  inStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inStockText: {
    fontSize: Font.Font_M,
    color: '#009420',
    marginRight: 10,
    marginLeft: 5,
  },
  verticalDivider: {
    fontSize: Font.Font_M,
    fontWeight: '700',
    color: Color.C_border,
    marginHorizontal: 10,
  },
  ratingText: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    color: Color.C_H_black,
  },
  discountTextCon: {
    height: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  discountPercent: {
    color: Color.C_main,
    fontSize: Font.Font_S,
  },
  title: {
    fontSize: Font.Font_L,
    marginBottom: 10,
    lineHeight: 25,
  },
  productIdandDisc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  brandLogoContainer: {
    width: 24,
    height: 24,
    backgroundColor: Color.C_white,
    borderRadius: 4,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    padding: 4,
    marginRight: 5,
  },
  brandLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  brandName: {
    fontSize: Font.Font_M,
    color: 'rgba(0,0,0,0.6)',
  },
  colorIndicatorCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  colorIndicator: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: Font.Font_XL,
    marginRight: 10,
  },
  productPrice: {
    fontSize: Font.Font_XL,
    fontWeight: '700',
    color: Color.C_main,
  },
  discountedPrice: {
    fontSize: Font.Font_L,
    color: Color.C_H_black,
    textDecorationLine: 'line-through',
  },
  currency: {
    fontSize: Font.Font_X,
    fontWeight: '500',
  },
  discountedCurrency: {
    fontSize: Font.Font_M,
  },
});
