import { View, Text } from 'react-native';
import React from 'react';
import { homePageCateTitleStyle } from './HomePageProCateTitleStyle';
import { useNavigation } from '@react-navigation/native';

const HomePageProductCateTitle = ({ title, subTitle }: { title: string; subTitle: string }) => {
  const navigation: any = useNavigation();
  return (
    <View style={homePageCateTitleStyle.container}>
      <Text style={homePageCateTitleStyle.title}>{title}</Text>
      <Text onPress={() => navigation.navigate('Products')} style={homePageCateTitleStyle.subTitle}>
        {subTitle}
      </Text>
    </View>
  );
};

export default HomePageProductCateTitle;
