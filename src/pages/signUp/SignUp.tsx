import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SignUpStyle } from './SignUpStyle';
import { Eye, EyeOf } from '../../../assets/allSvg/AllSvg';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CustomAnimatedLogo from '../../components/customLogo/CustomAnimatedLogo';
import { StatusBar } from 'expo-status-bar';
import CustomLoader from '../../components/customLoader/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../../constants/GlobalStyle';
import { loginStyle } from '../logIn/LoginStyle';

const SignUp = () => {
  const [passEye, setPassEye] = useState(true);
  const [passConEye, setPassConEye] = useState(true);
  const [ragistrationResult, setRegistrationResult] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const navigation: any = useNavigation();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [indicator, setIndicator] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    ragistrationResult && setLoaderVisible(false);
  }, [ragistrationResult]);

  let checkPassword;
  if (password !== confirmPassword) {
    checkPassword = false;
  }

  // const handleSignUp = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append('fullName', fullName);
  //     formData.append('email', email);
  //     formData.append('password', password);
  //     formData.append('confirmPassword', confirmPassword);

  //     const result: any = await userRegistration(formData);

  //     if (result && result.data && result.data.data) {
  //       const userInfo = result.data.data.user;
  //       await storeUserInfo({ accessToken: result.data.data.accessToken });

  //       if (result.data.data.accessToken) {
  //         navigation.navigate('OTP', { userInfo, password: password });
  //       }

  //       setRegistrationResult(result.data.message);
  //       setFullName('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmPassword('');
  //     } else {
  //       console.error('Unexpected response format:', result);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     // Handle error here
  //   }
  // };

  const handleSignUp = async () => {
    setIndicator(true);
    try {
      const formData = new FormData();

      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);

      const response = await fetch('https://api.theqprint.com/api/v1/user/signup', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const userInfo = result?.data?.user;
        // const setUserInfo = result?.data?.accesToken;
        // await storeUserInfo(setUserInfo);
        if (result?.data?.accessToken) {
          await AsyncStorage.setItem('accessToken', result?.data?.accessToken);
          navigation.navigate('OTP', { userInfo, password });
        }

        // await storeUserInfo(result?.data?.accessToken);
        setRegistrationResult(result.message);
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        if (result && result.message) {
          setErrorMessage(result.message);
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIndicator(false);
    }
  };

  return (
    <View style={SignUpStyle.container}>
      {/* gradient image container */}
      <View style={SignUpStyle.gradientImgCon}>
        <Image
          style={SignUpStyle.gradientImg}
          source={require('../../../assets/image/LoginGradient.png')}
        />
      </View>
      {/* logo container */}
      <CustomAnimatedLogo />
      {/* input container */}
      <ScrollView>
        <View style={SignUpStyle.inputContainer}>
          <Text style={SignUpStyle.signUpText}>Sign Up</Text>
          {/* number input and labe container */}
          <View style={SignUpStyle.inputAndTextCon}>
            <Text style={SignUpStyle.label}>Full Name</Text>
            <TextInput
              onChangeText={(text) => setFullName(text)}
              placeholder="Full Name"
              keyboardType="default"
              style={SignUpStyle.input}
            />
          </View>
          {/* QID input and labe container */}
          <View style={SignUpStyle.inputAndTextCon}>
            <Text style={SignUpStyle.label}>Email</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              keyboardType="default"
              style={SignUpStyle.input}
            />
          </View>
          {/* password input and label container */}
          <View style={SignUpStyle.inputAndTextCon}>
            <Text style={SignUpStyle.label}>Password</Text>
            {/* password */}
            <View style={SignUpStyle.passwordInputCon}>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={passEye}
                placeholder="Enter Password"
                style={SignUpStyle.passwordInput}
              />
              <TouchableOpacity
                onPress={() => setPassEye(!passEye)}
                activeOpacity={0.7}
                style={SignUpStyle.eye}>
                {passEye ? <EyeOf /> : <Eye />}
              </TouchableOpacity>
            </View>
          </View>
          {/* password input and label container */}
          <View style={SignUpStyle.inputAndTextCon}>
            <Text style={SignUpStyle.label}>Confirm Password</Text>
            {/* password */}
            <View style={SignUpStyle.passwordInputCon}>
              <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={passConEye}
                placeholder="Enter confirm password"
                style={SignUpStyle.passwordInput}
              />
              <TouchableOpacity
                onPress={() => setPassConEye(!passConEye)}
                activeOpacity={0.7}
                style={SignUpStyle.eye}>
                {passConEye ? <EyeOf /> : <Eye />}
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
            </View>
          </View>
          <View style={{ position: 'absolute', top: '50%' }}>
            {indicator ? (
              <CustomLoader indicator={indicator} setIndicator={setIndicator} />
            ) : ragistrationResult ? (
              !indicator
            ) : null}
          </View>
          {/* sign up button  */}
          <LinearGradient
            colors={['#C83B62', '#7F35CD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={SignUpStyle.signUpButton}>
            <TouchableOpacity
              disabled={checkPassword}
              onPress={() => {
                handleSignUp();
              }}
              style={SignUpStyle.actionLayer}>
              <Text style={SignUpStyle.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={loginStyle.signupText}>
            have an account{'  '}
            <Text
              onPress={() => navigation.navigate('login')}
              style={{ color: Color.C_main, fontWeight: '600' }}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

export default SignUp;
