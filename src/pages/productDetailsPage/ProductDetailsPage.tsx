import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../constants/GlobalStyle';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { FavIcon, Goback } from '../../../assets/allSvg/AllSvg';
import { productDetailPageStyle } from './ProductDetailPageStyle';
import { useNavigation } from '@react-navigation/native';
interface ProductDetailsPageProps {
  route: {
    params: {
      imageSource: string;
    };
  };
}

const ProductDetailsPage = (props: any) => {
  const item: any = props?.route?.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={productDetailPageStyle.container}>
      <ScrollView>
        <View style={productDetailPageStyle.topSection}>
          <View style={productDetailPageStyle.backArrowAndFavCon}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={productDetailPageStyle.backArrowFAV}
            >
              <Goback />
            </TouchableOpacity>
            <TouchableOpacity style={productDetailPageStyle.backArrowFAV}>
              <FavIcon />
            </TouchableOpacity>
          </View>
          <View style={productDetailPageStyle.imgCon}>
            <Animated.Image
              sharedTransitionTag="image"
              style={productDetailPageStyle.img}
              source={item?.item?.img}
            />
          </View>
        </View>
        {/* body section */}
        <View style={productDetailPageStyle.bodyContainer}>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsPage;
