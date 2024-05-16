import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { productReviewsStyle } from './ProductReviewsStyle';
import Animated, { FadeInRight, SlideInRight } from 'react-native-reanimated';
import { Color, Font } from '../../constants/GlobalStyle';
import { formatDate } from '../../utils/formatDate';
import { mainUrl } from '../../constants/mainUrl';
import { Rating } from 'react-native-ratings';
import { useGetReviewById } from '../../hooks/allHooks';

const ProductReviews = ({ item }: { item: any }) => {
  const { data: review } = useGetReviewById(`product.productId=${item?._id}`);

  return (
    <Animated.View
      style={{ backgroundColor: Color.C_white }}
      entering={FadeInRight.delay(50).duration(300)}
    >
      <View style={productReviewsStyle.ratingAndReviewsCon}>
        <Text style={productReviewsStyle.ratingAndReviewsText}>Ratings & Reviews ({})</Text>
        <FlatList
          data={review?.data}
          renderItem={({ item }) => {
            return (
              <View style={productReviewsStyle.reviewerCon}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={productReviewsStyle.reviewerImg}
                    source={{ uri: `${mainUrl}${item?.reviewer?.profilePhoto}` }}
                  />
                  <View style={productReviewsStyle.reviewerNameAndDate}>
                    <Text style={productReviewsStyle.reviewerName}>{item?.reviewer?.fullName}</Text>
                    <Text style={productReviewsStyle.reviewDate}>
                      {formatDate(item?.createdAt)}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginLeft: 60 }}>
                  <Rating
                    type="custom"
                    ratingCount={5}
                    imageSize={16}
                    ratingBackgroundColor="#e9e9e9"
                    ratingColor="#F16A26"
                    ratingTextColor="#e9e9e9"
                    startingValue={item?.rating}
                    style={{ marginBottom: 8 }}
                  />
                  <Text style={{ fontSize: Font.Font_S }}>{item?.comment}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </Animated.View>
  );
};

export default ProductReviews;
