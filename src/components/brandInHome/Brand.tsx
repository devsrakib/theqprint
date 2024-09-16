import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { brandStyle } from './BrandStyle';
import { useNavigation } from '@react-navigation/native';
import { IBrand } from '../../types/interfaces/brand.interface';
import { mainUrl } from '../../constants/mainUrl';

const Brand = ({ item }: { item: IBrand }) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('BrandDetails', { ...item })}
      style={brandStyle.container}>
      <Image
        style={{ width: '90%', height: '90%', borderRadius: 50 }}
        source={{ uri: `${mainUrl}${item?.brandPhoto}` }}
      />
    </TouchableOpacity>
  );
};

export default memo(Brand);
