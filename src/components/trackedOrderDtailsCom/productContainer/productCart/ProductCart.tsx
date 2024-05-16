import { View, Text, Image } from 'react-native';
import React from 'react';
import { productCartStyle } from './ProductCartStyle';
import { IOrder, IOrderHistory } from '../../../../types/interfaces/orderHistory.interface';
import { mainUrl } from '../../../../constants/mainUrl';

const ProductCart = ({ item }: { item: IOrderHistory }) => {
  return (
    <View style={productCartStyle.container}>
      <View style={productCartStyle.subContainer}>
        <View style={productCartStyle.imgCon}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            source={{ uri: `${mainUrl}${item?.productPhotos[0]}` }}
          />
        </View>
        <View style={productCartStyle.textContainer}>
          <Text style={productCartStyle.productNameAndSpec}>{item?.productName}</Text>
          <View style={productCartStyle.currencyAndPriceCon}>
            <Text style={productCartStyle.price}>
              {item?.variant?.discountedPrice
                ? item?.variant?.discountedPrice
                : item?.variant?.sellingPrice}{' '}
              <Text style={productCartStyle.currency}>QAR</Text>
            </Text>
            <Text style={productCartStyle.verticalDivider}>|</Text>
            <Text>X {item?.orderQuantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCart;
