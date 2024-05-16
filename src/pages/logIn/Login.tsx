import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { loginStyle } from './LoginStyle';

import { Color } from '../../constants/GlobalStyle';

import { Eye, EyeOf } from '../../../assets/allSvg/AllSvg';

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

import Animated, { FadeInDown, ZoomInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAnimatedLogo from '../../components/customLogo/CustomAnimatedLogo';
import { StatusBar } from 'expo-status-bar';
import CustomLoader from '../../components/customLoader/CustomLoader';

const Login = () => {
  const navigation: any = useNavigation();
  const [eye, setEye] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState('');
  const [indicator, setIndicator] = useState<boolean>(false);
  const [forgotPassEmail, setForgotPassEmail] = useState<string>('');

  const sourceForGotPass = 'sourceForGotPss';

  const handleSubmit = async () => {
    setIndicator(true); // Start the loader
    try {
      const user = {
        email,
        password,
      };
      const response = await fetch('https://api.theqprint.com/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (result?.data?.accessToken && result?.data?.user?.isVerified === true) {
        await AsyncStorage.setItem('varifyUser', 'true');
        await AsyncStorage.setItem('accessToken', result?.data?.accessToken);
        navigation.navigate('BottomTab');
      } else if (result?.data?.accessToken && result?.data?.user?.isVerified === false) {
        navigation.navigate('OTP');
      }
      setIsError(result?.errorMessages[0].message);
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIndicator(false);
    }
  };
  const handleForgotPass = async () => {
    setIndicator(true); // Start the loader
    try {
      const email = {
        email: forgotPassEmail,
      };
      const response = await fetch('https://api.theqprint.com/api/v1/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      const result = await response.json();
      console.log(result);

      if (result?.success === true) {
        navigation.navigate('OTP', { sourceForGotPass, email });
        setIsModalVisible(false);
      }

      setIsError(result?.errorMessages[0].message);
    } catch (error) {
    } finally {
      setIndicator(false);
    }
  };

  return (
    <View style={loginStyle.container}>
      {/* gradient background image container */}
      <View style={loginStyle.gradientContainer}>
        <Image
          style={loginStyle.gradientImg}
          source={require('../../../assets/image/LoginGradient.png')}
        />
      </View>
      {/* company logo container */}
      <CustomAnimatedLogo />
      {/* input container */}
      <ScrollView>
        <Animated.View
          entering={FadeInDown.delay(20).duration(400)}
          style={loginStyle.inputContainer}>
          <Text style={loginStyle.login}>Login</Text>
          <Text style={loginStyle.dummy}>Please login to continue</Text>
          {/* input and label container */}
          <View style={loginStyle.inputAndLabelCon}>
            <Text style={loginStyle.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              style={[isError ? loginStyle.failedInput : loginStyle.input]}
              value={email}
              onChangeText={(Text) => setEmail(Text)}
            />
          </View>
          {/* input and label container */}
          <View style={loginStyle.inputAndLabelCon}>
            <Text style={loginStyle.label}>Password</Text>
            <View style={[isError ? loginStyle.failedPassword : loginStyle.inputPasswordCon]}>
              <TextInput
                style={loginStyle.inputPassword}
                secureTextEntry={eye}
                placeholder="Enter password"
                value={password}
                onChangeText={(Text) => setPassword(Text)}
              />
              <TouchableOpacity onPress={() => setEye(!eye)} style={loginStyle.eye}>
                {eye ? <EyeOf /> : <Eye />}
              </TouchableOpacity>
            </View>
          </View>
          {/* remember and forgot password text container */}
          <View style={loginStyle.rememberAndForgotTextCon}>
            {/* <TouchableOpacity activeOpacity={0.7} style={loginStyle.checkMarkAndRememberText}>
              <Image source={require('../../../assets/image/checkIcon.png')} />
              <Text style={loginStyle.rememberText}>Remember me</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => setIsModalVisible(true)}
              activeOpacity={0.7}>
              <Text style={loginStyle.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', top: '50%' }}>
            {indicator ? (
              <CustomLoader indicator={indicator} setIndicator={setIndicator} />
            ) : isError ? (
              !indicator
            ) : null}
          </View>
          <View style={loginStyle.errorMessageCon}>
            {isError && <Text style={loginStyle.errorMessage}>{isError}</Text>}
          </View>
          {/* login button */}
          <LinearGradient
            colors={['#C83B62', '#7F35CD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={loginStyle.loginButtonCon}>
            <TouchableOpacity
              // disabled={disabledButton}
              activeOpacity={0.7}
              style={loginStyle.actionLayer}
              onPress={() => handleSubmit()}>
              <Text style={loginStyle.buttonText}>Log in</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* sign up button and text con */}
          <View>
            <Text style={loginStyle.signupText}>
              Don't have an account?{'  '}
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={{ color: Color.C_main, fontWeight: '600' }}>
                Sign Up
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
      <Modal
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setIsModalVisible(!isModalVisible)}
        isVisible={isModalVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}>
        {/* modal content */}
        <View style={loginStyle.modalContent}>
          <View style={loginStyle.modalIndicator} />
          <Text style={loginStyle.forgotTextInModal}>Forgot Password</Text>
          <Text style={loginStyle.dummyText}>
            Enter your email for the verification proccess we will send 4 degits code to your email
          </Text>
          {/* input and input labe */}
          <View style={loginStyle.inputAndLabeCon}>
            <Text style={loginStyle.label}>Email or Phone Number</Text>
            <TextInput
              style={loginStyle.input}
              placeholder="Enter Email"
              onChangeText={(e: string) => setForgotPassEmail(e)}
            />
          </View>
          <LinearGradient
            colors={['#C83B62', '#7F35CD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={loginStyle.continueButton}>
            <TouchableOpacity
              onPress={() => {
                handleForgotPass();
                // setIsModalVisible(false);
                // navigation.navigate('forgotPass');
              }}
              activeOpacity={0.7}
              style={loginStyle.actionLayer}>
              <Text style={loginStyle.buttonText}>Continue</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      <StatusBar style="dark" />
    </View>
  );
};

export default Login;
