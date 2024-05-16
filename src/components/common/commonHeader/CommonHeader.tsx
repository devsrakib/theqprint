import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { BackArrow, CartBag, CartIcon } from '../../../../assets/allSvg/AllSvg';
import { commonHeaderStyle } from './CommonHeaderStyle';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-paper';
import { useGetCart } from '../../../hooks/allHooks';
import { CartItemContext } from '../../../Providers/CartItemProvider';

const CommonHeader = ({ title, cartBox }: { title: any; cartBox: boolean }) => {
  const navigation: any = useNavigation();
  const { cart } = useContext(CartItemContext);

  return (
    <View style={commonHeaderStyle.container}>
      <View style={commonHeaderStyle.titleCon}>
        <TouchableOpacity
          style={commonHeaderStyle.backButton}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <Text style={commonHeaderStyle.title}>{title}</Text>
      </View>
      {cartBox && cart?.data?.products?.length ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('MyCart')}
          activeOpacity={0.7}
          style={commonHeaderStyle.cartIcon}
        >
          <CartBag />
          <Badge style={commonHeaderStyle.badge}>{cart?.data?.products?.length}</Badge>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommonHeader;
