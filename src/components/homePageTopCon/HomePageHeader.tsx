import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { homePageStyle } from './HomePageHeaderStyle';
import { CartBag } from '../../../assets/allSvg/AllSvg';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useGetCart } from '../../hooks/allHooks';
import { CartItemContext } from '../../Providers/CartItemProvider';

const HomePageTopCon = () => {
  const navigation: any = useNavigation();
  const { cart } = useContext(CartItemContext);

  return (
    <View style={homePageStyle.container}>
      <Image style={homePageStyle.logo} source={require('../../../assets/image/logo.png')} />
      {cart?.data === null ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate('MyCart')}
          activeOpacity={0.7}
          style={homePageStyle.cart}
        >
          <CartBag />
          <Badge style={homePageStyle.badge}>{cart?.data?.products?.length}</Badge>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomePageTopCon;
