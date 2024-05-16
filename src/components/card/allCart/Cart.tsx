import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IProduct } from '../../../types/interfaces/product.interface';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';
import { mainUrl } from '../../../constants/mainUrl';

// cart props

const Cart = ({ item }: { item: IProduct }) => {
  const navigation: any = useNavigation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const defaultItem = item.variants?.find((defaultVariant) => defaultVariant?.isDefault);
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ProductDetails', { productId: item?._id })}
      >
        <View style={styles.imgCon}>
          {/* <FlatList
            pagingEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item?.productPhotos}
            onScroll={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / cartWidth);
              setCurrentIndex(currentIndex);
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
          <View
            style={styles.productImgCon}

            //   onPress={() => navigation.navigate('ProductDeatils', { ...item })}
            //   activeOpacity={1}
          >
            {item?.productPhotos && (
              <Image
                style={styles.productImg}
                source={{ uri: `${mainUrl}${item?.productPhotos[0]}` }}
              />
            )}
          </View>
          {/* <View style={styles.paginationCon}>
            {item?.productPhotos?.map((_, index: number) => {
              return (
                <View
                  key={index.toString()}
                  style={[
                    styles.paginationDot,
                    {
                      width: currentIndex == index ? 10 : 5,
                      backgroundColor: currentIndex == index ? Color.C_H_black : '#7F35CD',
                    },
                  ]}
                />
              );
            })}
          </View> */}
        </View>
        {defaultItem?.discountPercentage && (
          <View style={styles.discountCon}>
            <Text style={styles.discountText}>{defaultItem?.discountPercentage}%</Text>
          </View>
        )}
        <View style={styles.descCon}>
          <View style={{ height: 30 }}>
            <Text style={styles.title} numberOfLines={1}>
              {item?.productName}
            </Text>
          </View>
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

export default Cart;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#FFE5E5',
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
    justifyContent: 'center',
  },
  contentContainerStyle: {
    // paddingRight: 20,
  },
  productImgCon: {
    width: '100%', // Adjusted to match the width of the image
    height: 95, // Adjusted to match the height of the image
    alignSelf: 'center',
  },
  productImg: {
    width: '100%',
    height: '100%', // Adjust the height of your images as needed
    borderRadius: 5,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginHorizontal: 10,
  },

  descCon: {
    marginHorizontal: 10,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.80)',
    fontSize: Font.Font_M,
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
    width: '100%',
    flexWrap: 'wrap',
    height: 40,
  },
  currentPrice: {
    fontSize: Font.Font_M,
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
