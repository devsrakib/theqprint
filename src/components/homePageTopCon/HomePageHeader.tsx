import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { homePageStyle } from './HomePageHeaderStyle';
import HeaderCartIcon from '../common/commonHeader/HeaderCartIcon';

const HomePageTopCon = () => {
  return (
    <View style={homePageStyle.container}>
      <Image style={homePageStyle.logo} source={require('../../../assets/image/logo.png')} />
      <HeaderCartIcon />
    </View>
  );
};

export default HomePageTopCon;
