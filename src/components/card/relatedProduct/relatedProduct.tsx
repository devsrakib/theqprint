import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Color, Font, shadows } from '../../../constants/GlobalStyle';
import { mainUrl } from '../../../constants/mainUrl';
import { IProduct } from '../../../types/interfaces/product.interface';

const RelatedProduct = ({ item, scrollToTop }: { item: IProduct; scrollToTop: any }) => {
  const navigation: any = useNavigation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const defaultItem = item.variants?.find((defaultVariant) => defaultVariant?.isDefault);

  return (
    <Animated.View style={styles.container} entering={FadeInDown.delay(50).duration(500)}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          scrollToTop();
          navigation.navigate('ProductDetails', { productId: item?._id });
        }}>
        <View style={styles.imgCon}>
          {/* <FlatList
            pagingEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item?.productPhotos}
            onScroll={(e) => {
              setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / 120));
            }}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item: img }) => {
              return (
                <TouchableOpacity
                  style={styles.productImgCon}

                  //   onPress={() => navigation.navigate('ProductDeatils', { ...item })}
                  //   activeOpacity={1}
                >
                  <Image style={styles.productImg} source={{ uri: `${mainUrl}${img}` }} />
                </TouchableOpacity>
              );
            }}
          /> */}
          {item?.productPhotos && (
            <Image
              style={styles.productImg}
              source={{ uri: `${mainUrl}${item?.productPhotos[0]}` }}
            />
          )}
          <View style={styles.paginationCon}>
            {item?.productPhotos?.map((i, index: number) => {
              return (
                <View
                  key={index.toString()}
                  style={[
                    styles.paginationDot,
                    {
                      width: currentIndex === index ? 10 : 5,
                      backgroundColor: currentIndex === index ? Color.C_H_black : '#7F35CD',
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.discountCon}>
          <Text style={styles.discountText}>{defaultItem?.discountPercentage}%</Text>
        </View>
        <View style={styles.descCon}>
          <Text style={styles.title} numberOfLines={2}>
            {item?.productName}
          </Text>
          <Text style={styles.startRating}>
            ⭐️ <Text style={styles.rating}>({item?.totalReview})</Text>
          </Text>
          <View style={styles.priceCon}>
            <Text style={styles.currentPrice}>
              {defaultItem?.discountedPrice} <Text style={styles.currency}>QAR</Text>
            </Text>
            <Text style={styles.discountedPrice}>{defaultItem?.sellingPrice} QAR</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RelatedProduct;

const styles = StyleSheet.create({
  container: {
    width: 190,
    paddingBottom: 10,
    backgroundColor: Color.C_white,
    borderRadius: 10,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  discountCon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ffe5e5',
  },
  discountText: {
    fontSize: 10,
    color: Color.C_red,
  },
  imgCon: {
    width: '80%',
    height: 110,
    alignSelf: 'center',
    marginTop: 10,
  },
  contentContainerStyle: {
    // paddingRight: 20,
  },
  productImgCon: {
    width: 140, // Adjusted to match the width of the image
    height: 110, // Adjusted to match the height of the image
  },
  productImg: {
    width: 140, // Adjusted to fit the width of the screen minus margin
    height: 90, // Adjust the height of your images as needed
    borderRadius: 5,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginHorizontal: 10,
  },

  descCon: {
    marginHorizontal: 20,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.80)',
    fontSize: Font.Font_L,
    marginBottom: 5,
  },
  startRating: {
    fontSize: Font.Font_S,
    marginBottom: 5,
  },
  rating: {
    fontSize: Font.Font_S,
    color: 'rgba(0,0,0,0.5)',
  },
  priceCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: Font.Font_L,
    fontWeight: '700',
    color: Color.C_main,
    marginRight: 10,
  },
  currency: {
    fontSize: Font.Font_STen,
    fontWeight: '700',
    color: Color.C_main,
  },
  discountedPrice: {
    fontSize: Font.Font_S,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },

  paginationCon: {
    // position: "absolute",
    // bottom: 80,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 10,
    marginTop: 5,
  },
  paginationDot: {
    height: 5,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
