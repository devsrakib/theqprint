import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { topBrandStyle } from './TopBrandStyle';
import { useNavigation } from '@react-navigation/native';
import { IBrand } from '../../../types/interfaces/brand.interface';
import { mainUrl } from '../../../constants/mainUrl';

const TopBrand = ({ item }: { item: IBrand }) => {
  const navigation: any = useNavigation();
  return (
    <>
      {
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('BrandDetails', { ...item })}
          style={topBrandStyle.container}
        >
          <View style={topBrandStyle.logoCon}>
            <Image style={topBrandStyle.logo} source={{ uri: `${mainUrl}${item?.brandPhoto}` }} />
          </View>
          <Text style={topBrandStyle.brandName}>{item?.brandName}</Text>
        </TouchableOpacity>
      }
    </>
  );
};

export default TopBrand;
