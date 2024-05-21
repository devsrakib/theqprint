/**
 * BrandDetails Component
 *
 * This component renders details about a specific brand, including its logo, name, and available products.
 *
 * Features:
 * - Utilizes a CommonHeader component to display the title "Brand Details" at the top.
 * - Displays the brand's logo, name, and the number of available products.
 * - Integrates a favorite icon to allow users to mark the brand as a favorite.
 * - Includes a TopTab component to navigate between different sections related to the brand.
 * - Utilizes StatusBar for configuring the status bar style.
 *
 * @param {object} props - Route parameters containing the brand details.
 * @returns JSX.Element
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BackArrow, FavIcon } from '../../../assets/allSvg/AllSvg';
import { brandDetailsStyle } from './BrandDetailsStyle';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { TopTab } from '../../routes/material_Tab/TopTab';
import { StatusBar } from 'expo-status-bar';
import { IBrand } from '../../types/interfaces/brand.interface';
import { mainUrl } from '../../constants/mainUrl';
import { useProductQuery } from '../../hooks/allHooks';
import { commonHeaderStyle } from '~/components/common/commonHeader/CommonHeaderStyle';
import HeaderCartIcon from '~/components/common/commonHeader/HeaderCartIcon';
import { useNavigation } from '@react-navigation/native';

const BrandDetails: React.FC<IBrand> = (props) => {
  // Extract the brand details from route params
  const item = props?.route?.params;
  const { data, isLoading } = useProductQuery(
    `brand.brandName=${item?.brandName || item?.brand?.brandName}`
  );
  const navigation = useNavigation<any>();
  return (
    <View style={brandDetailsStyle.container}>
      {/* Common Header */}
      <View style={[commonHeaderStyle.container, { elevation: 0 }]}>
        <View style={commonHeaderStyle.titleCon}>
          <TouchableOpacity
            style={commonHeaderStyle.backButton}
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={commonHeaderStyle.title}>Brand Details</Text>
        </View>
        <HeaderCartIcon />
      </View>

      {/* Body Section */}
      <View style={brandDetailsStyle.brandSpecCon}>
        <View style={brandDetailsStyle.brandLogoAndNameCon}>
          {/* Brand Logo */}
          <View style={brandDetailsStyle.logoCon}>
            <Image
              style={brandDetailsStyle.brandImages}
              source={{ uri: `${mainUrl}${item?.brandPhoto}` }}
            />
          </View>
          {/* Brand Name and Availability */}
          <View>
            <Text style={brandDetailsStyle.brandName}>
              {item?.brandName || item?.brand?.brandName}
            </Text>
            <Text style={brandDetailsStyle.availableText}>
              {data?.data?.length} Product Available
            </Text>
          </View>
        </View>
        {/* Favorite Icon */}
        {/* <TouchableOpacity activeOpacity={0.7} style={brandDetailsStyle.favCon}>
          <FavIcon />
        </TouchableOpacity> */}
      </View>

      {/* Tab Section */}
      <View style={{ flex: 1 }}>
        {/* @ts-ignore */}
        <TopTab brandName={item?.brandName || item?.brand?.brandName} />
      </View>

      {/* StatusBar Configuration */}
      <StatusBar style="dark" />
    </View>
  );
};

export default BrandDetails;
