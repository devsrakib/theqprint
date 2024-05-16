import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import ReviewTopTab from '../../routes/material_Tab/ReviewTopTab';
import { reviewStyle } from './ReviewStyle';

const Review = () => {
  return (
    <View style={reviewStyle.container}>
      <CommonHeader title="My Review" cartBox={true} />
      <View style={{ flex: 1, marginTop: 5 }}>
        <ReviewTopTab />
      </View>
    </View>
  );
};

export default Review;
