import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { productSpecStyle } from './ProductSpecStyle';
import { ISpecification } from '../../types/interfaces/product.interface';
const ProductSpec = ({ item }: { item: ISpecification[] }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(70).duration(200)}
      style={{ backgroundColor: '#fff', flex: 1 }}>
      {item?.map((i, index: number) => {
        return (
          <View style={productSpecStyle.container}>
            <View key={index.toString()} style={productSpecStyle.specBox}>
              <Text style={productSpecStyle.specTitle}>{i?.sectionName}</Text>
            </View>
            {i?.blocks?.map((i) => {
              return (
                <View style={[productSpecStyle.specBox, { marginLeft: 20 }]}>
                  <Text style={productSpecStyle.specDescTitle}>{i?.title}</Text>
                  <Text style={productSpecStyle.specDestText}>{i?.description}</Text>
                </View>
              );
            })}
            <Divider style={{ width: '95%', alignSelf: 'center' }} />
          </View>
        );
      })}
    </Animated.View>
  );
};

export default ProductSpec;
