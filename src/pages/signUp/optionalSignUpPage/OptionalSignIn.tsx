import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { optionalSignInStyle } from './OtionalSignInStyle';
import { WhiteLogo } from '../../../../assets/allSvg/AllSvg';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const OptionalSignIn = () => {
  const navigation: any = useNavigation();
  return (
    <View style={optionalSignInStyle.container}>
      {/* gradient image container */}
      <View style={optionalSignInStyle.gradientImgCon}>
        <Image
          style={optionalSignInStyle.gradientImg}
          source={require('../../../../assets/image/LoginGradient.png')}
        />
      </View>
      {/* logo container */}
      <View style={optionalSignInStyle.logoContainer}>
        <WhiteLogo />
      </View>
      {/* input container */}
      <View style={optionalSignInStyle.inputContainer}>
        <Text style={optionalSignInStyle.title}>Sign Up</Text>
        {/* input and label container */}
        <View style={optionalSignInStyle.inputAndLabeCon}>
          <Text style={optionalSignInStyle.label}>First Name</Text>
          <TextInput style={optionalSignInStyle.input} placeholder="Type here" />
        </View>
        <View style={optionalSignInStyle.inputAndLabeCon}>
          <Text style={optionalSignInStyle.label}>Last Name</Text>
          <TextInput style={optionalSignInStyle.input} placeholder="Type here" />
        </View>
        <View style={optionalSignInStyle.inputAndLabeCon}>
          <Text style={optionalSignInStyle.label}>Phone</Text>
          <TextInput style={optionalSignInStyle.input} placeholder="Type here" />
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#C83B62', '#7F35CD']}
          style={optionalSignInStyle.continue}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('HomePage')}
            activeOpacity={0.7}
            style={optionalSignInStyle.actionLayer}
          >
            <Text style={optionalSignInStyle.buttonText}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity activeOpacity={0.7} style={optionalSignInStyle.skipButton}>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionalSignIn;
