import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { Color } from '../../constants/GlobalStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { otpStyle } from '../OTP/OTPStyle';
import { useNavigation } from '@react-navigation/native';
import { BackArrow } from '../../../assets/allSvg/AllSvg';

const otpInput = [1, 1, 1, 1];
const ForgotPass = ({ disable }: any) => {
  const inputRefs = useRef<Array<TextInput>>([]);
  const [focus, setFocus] = useState(false);
  const navigation: any = useNavigation();
  const handleInputChange = (text: string, index: any) => {
    setFocus(!focus);
    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }

    return inputRefs?.current[index - 1]?.focus();
  };

  return (
    <View style={otpStyle.container}>
      {/* header container */}
      <View
        style={{
          height: 70,
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Forgot password</Text>
      </View>
      <ScrollView>
        {/* logo container */}
        <View style={{ marginBottom: 50, marginTop: 40 }}>
          <Image
            style={otpStyle.otpLogo}
            source={require('../../../assets/image/otpScreenLogo.png')}
          />
        </View>
        <View style={otpStyle.textContainer}>
          <Text style={otpStyle.text1}>Enter 4 Digits Code</Text>
          <Text style={otpStyle.text2}>
            Enter the 4 digits code that you received on {`\n`} you email
          </Text>
          <Text style={otpStyle.email}>akrc.upwork@gmail.com</Text>
        </View>
        <View style={[otpStyle.otpInputCon]}>
          {[...new Array(otpInput.length)].map((item, index) => (
            <TouchableOpacity
              style={[
                otpStyle.otpInput,
                {
                  borderWidth: 1,
                  borderRadius: 6,
                  borderColor: Color.C_border,
                },
              ]}
            >
              <TextInput
                ref={(ref) => {
                  if (ref && !inputRefs.current.includes(ref)) {
                    inputRefs.current = [...inputRefs.current, ref];
                  }
                }}
                key={index}
                maxLength={1}
                contextMenuHidden
                selectTextOnFocus
                editable={!disable}
                testID={`OTPInput=${index}`}
                keyboardType="numeric"
                style={{
                  width: '50%',
                  height: '100%',
                  fontSize: 24,
                  color: Color.C_main,
                }}
                focusable={focus}
                onChangeText={(text) => handleInputChange(text, index)}
              />
            </TouchableOpacity>
          ))}
        </View>
        {/* verify button */}
        <LinearGradient
          colors={['#C83B62', '#7F35CD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 50,
            borderRadius: 25,
            marginTop: 150,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('NewPass')}
            style={otpStyle.actionLayer}
          >
            <Text style={otpStyle.buttonText}>Verify</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={{ alignSelf: 'center', marginTop: 20, color: Color.C_main }}>0:30s</Text>
      </ScrollView>
    </View>
  );
};

export default ForgotPass;
