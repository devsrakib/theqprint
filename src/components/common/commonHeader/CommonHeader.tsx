import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { BackArrow, CartBag, CartIcon } from '../../../../assets/allSvg/AllSvg';
import { commonHeaderStyle } from './CommonHeaderStyle';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-paper';
import { useGetCart } from '../../../hooks/allHooks';
import { CartItemContext } from '../../../Providers/CartItemProvider';
import HeaderCartIcon from './HeaderCartIcon';

const CommonHeader = ({ title, cartBox }: { title: any; cartBox: boolean }) => {
  const navigation: any = useNavigation();
  const { cart } = useContext(CartItemContext);

  return (
    <View style={commonHeaderStyle.container}>
      <View style={commonHeaderStyle.titleCon}>
        <TouchableOpacity
          style={commonHeaderStyle.backButton}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={commonHeaderStyle.title}>{title}</Text>
      </View>
      <HeaderCartIcon />
    </View>
  );
};

export default CommonHeader;
