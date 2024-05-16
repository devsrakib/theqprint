import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { productContainerStyle } from './ProductContainerStyle';
import OrderPlaceCart from '../../orderHistoryComponents/order_placed/orderPlaceCart/OrderPlaceCart';
import ProductCart from './productCart/ProductCart';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IOrder } from '../../../types/interfaces/orderHistory.interface';

const ProductContainer = ({ data }: { data: IOrder }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      style={productContainerStyle.container}
    >
      {data?.orderItems?.map((item, index) => {
        return <ProductCart key={index.toString()} item={item} />;
      })}
      <View style={productContainerStyle.quantityAndPriceCon}>
        <Text style={productContainerStyle.quantityText}>
          {data?.totalQuantity} Item, 3 Package
        </Text>
        <Text style={productContainerStyle.totalPrice}>
          {data?.totalPayable} <Text style={productContainerStyle.currency}>QAR</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

export default ProductContainer;
