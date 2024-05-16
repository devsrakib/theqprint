import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalBrandStyle } from './BrandInGlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { mainUrl } from '../../../constants/mainUrl';

const BrandInGlobalSearch = ({ item }: any) => {
  const navigation = useNavigation<any>();

  return (
    <>
      {item && (
        <TouchableOpacity
          onPress={() => navigation.navigate('BrandDetails', { ...item })}
          style={globalBrandStyle.container}
        >
          <Image style={globalBrandStyle.img} source={{ uri: `${mainUrl}${item?.brandPhoto}` }} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default BrandInGlobalSearch;
