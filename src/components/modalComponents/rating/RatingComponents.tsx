import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ratingComStyle } from './RatingComStyle';
import { RatingStar } from '../../../../assets/allSvg/AllSvg';
import { LinearGradient } from 'expo-linear-gradient';
import { Color } from '../../../constants/GlobalStyle';

const RatingComponents = () => {
  return (
    <View style={ratingComStyle.container}>
      <Image
        style={ratingComStyle.logo}
        source={require('../../../../assets/image/ratinglogo.png')}
      />
      <Text style={ratingComStyle.text}>How much you are enjoying our Q Printer?</Text>
      <View style={ratingComStyle.ratingStarCon}>
        <RatingStar />
      </View>
      <View style={ratingComStyle.buttonCon}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[ratingComStyle.button, ratingComStyle.cancel]}
        >
          <Text style={[ratingComStyle.buttonText]}>Cancel</Text>
        </TouchableOpacity>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#C83B62', '#7F35CD']}
          style={ratingComStyle.button}
        >
          <TouchableOpacity activeOpacity={0.7} style={ratingComStyle.linearActionLayer}>
            <Text style={[ratingComStyle.buttonText, { color: Color.C_white }]}>Rate Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default RatingComponents;
