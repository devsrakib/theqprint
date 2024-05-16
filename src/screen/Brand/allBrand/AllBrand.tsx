import { Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { allBrandStyle } from './AllBrandStyle';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IBrand } from '../../../types/interfaces/brand.interface';
import { mainUrl } from '../../../constants/mainUrl';
import { useProductQuery } from '../../../hooks/allHooks';

interface brandProps {
  brand: IBrand[];
}

const AllBrand = ({ item }: any) => {
  const navigation = useNavigation<any>();
  const { data, isLoading } = useProductQuery(`brand.brandName=${item?.brandName}`);

  return (
    <Animated.View
      entering={FadeInDown.delay(50).duration(500)}
      style={allBrandStyle.CartContainer}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('BrandDetails', { ...item })}
        style={allBrandStyle.cardActionLayer}
      >
        <Image style={allBrandStyle.logo} source={{ uri: `${mainUrl}${item?.brandPhoto}` }} />
        <Text style={allBrandStyle.brandName}>{item?.brandName}</Text>
        <Divider />
        <Text style={allBrandStyle.avilableProductText}>
          {data?.data?.length} Product Available
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AllBrand;
