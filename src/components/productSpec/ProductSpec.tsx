import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { productSpecStyle } from './ProductSpecStyle';
import Animated, { FadeInDown, FadeInRight, SlideInRight } from 'react-native-reanimated';
import { ISpecification } from '../../types/interfaces/product.interface';
import { productDescStyle } from '../productDesc/ProductDescStyle';
const ProductSpec = ({ item }: { item: ISpecification[] }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(70).duration(200)}
      style={{ backgroundColor: '#fff', flex: 1 }}
    >
      {item?.map((i, index: number) => {
        return (
          <View style={productSpecStyle.container}>
            <View key={index.toString()} style={productSpecStyle.specBox}>
              <Text style={productSpecStyle.specTitle}>{i?.sectionName}</Text>
            </View>
            {i?.blocks?.map((i) => {
              return (
                <View style={[productSpecStyle.specBox]}>
                  <Text style={productSpecStyle.specDescTitle}>{i?.title}</Text>
                  <Text style={productSpecStyle.specDestText}>{i?.description}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </Animated.View>
  );
};

export default ProductSpec;
