import { View, Text, Image, TouchableOpacity, ScrollView, AppState } from 'react-native';
import React, { useEffect, useState } from 'react';
import { otpStyle } from './OTPStyle';
import { Color } from '../../constants/GlobalStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../components/customLoader/CustomLoader';
import OTPInput from './OTPInput';
import { useUser } from '../../hooks/allHooks';

const OTP = (props: any) => {
  const information = props?.route?.params;

  const [timer, setTimer] = useState(120);
  const [timeUp, setTimeUp] = useState(false);
  const navigation = useNavigation<any>();
  const [varification, setVarification] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [indicator, setIndicator] = useState<boolean>(false);
  const [verifyOtp, setVerifyOtp] = useState<number>(0);
  const { data, setRefetch } = useUser();
  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(interval);
          setTimeUp(true);
          return 0;
        } else {
          return prevCounter - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Run only once when component mounts

  const minutes: number = Math.floor(timer / 60);
  const seconds: number = timer % 60;
  const formattedCounter: string = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const handleVarifySubmit = async () => {
    setIndicator(true);
    const OTP = Number(verifyOtp);
    const otp = {
      otp: OTP,
    };

    try {
      const response = await fetch('https://api.theqprint.com/api/v1/user/verify-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(otp),
      });
      const result = await response.json();
      if (result?.data?.accessToken && result?.data?.user?.isVerified === true) {
        await AsyncStorage.setItem('varifyUser', 'true');
        await AsyncStorage.setItem('accessToken', result?.data?.accessToken);
        navigation.navigate('BottomTab');
      }
      setRefetch((prev) => prev + 1);
      setVarification(result?.errorMessages[0]?.message);
    } catch (error) {
      // Handle error here
    } finally {
      setIndicator(false);
    }
  };
  const handleForgotPassSubmit = async () => {
    setIndicator(true);
    const OTP = Number(verifyOtp);
    const otp = {
      otp: OTP,
      email: information?.email?.email,
    };

    try {
      const response = await fetch('https://api.theqprint.com/api/v1/user/forgot-password-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(otp),
      });
      const result = await response.json();

      if (result?.data?.accessToken) {
        await AsyncStorage.setItem('accessToken', result?.data?.accessToken);
        navigation.navigate('NewPass');
      }
      // setRefetch((prev) => prev + 1);
      setVarification(result?.errorMessages[0]?.message);
    } catch (error) {
      // Handle error here
    } finally {
      setIndicator(false);
    }
  };

  const handleForgotPass = async () => {
    setIndicator(false);
    setTimer(120);
    setTimeUp(false);
    try {
      const email = {
        email: information?.email?.email,
      };
      const response = await fetch('https://api.theqprint.com/api/v1/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      const result = await response.json();

      setVarification(result?.errorMessages[0].message);
    } catch (error: any) {}
  };

  const handleResentSubmit = async () => {
    setIndicator(false);
    setTimer(120);
    setTimeUp(false);
    const email = information?.userInfo?.email;
    const password = information?.password;

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
        body: JSON.stringify(user ? user : null),
      });
      const result = await response.json();
      if (result?.data?.accessToken && result?.data?.user?.isVerified === true) {
        await AsyncStorage.setItem('varifyUser', 'true');
        navigation.navigate('BottomTab');
      }

      setVarification(result?.errorMessages[0].message);
    } catch (error: any) {
      setVarification(error.message);
    } finally {
      setIndicator(false);
    }
  };

  const resetFunctionality = () => {
    if (information?.sourceForGotPass === 'sourceForGotPss') {
      handleForgotPass();
    } else {
      handleResentSubmit();
    }
  };

  const handleSubmit = () => {
    // handleForgotPassSubmit();
    if (information?.sourceForGotPass === 'sourceForGotPss') {
      handleForgotPassSubmit();
    } else {
      handleVarifySubmit();
    }
  };

  return (
    <View style={otpStyle.container}>
      <ScrollView>
        {/* logo container */}
        <View style={otpStyle.logoContainer}>
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
          <Text style={otpStyle.email}>{information?.userInfo?.email}</Text>
        </View>
        <View style={otpStyle.otpInputCon}>
          <OTPInput length={4} setVerifyOtp={setVerifyOtp} />
        </View>
        {/* time container */}

        <View style={[otpStyle.timeContainer]}>
          <Text>{formattedCounter}</Text>
        </View>
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
          {varification && (
            <Text style={{ color: Color.C_red, alignSelf: 'center' }}>{varification}</Text>
          )}
        </View>
        <View style={{ position: 'absolute', top: '80%', left: '40%' }}>
          {indicator ? (
            <CustomLoader indicator={indicator} setIndicator={setIndicator} />
          ) : varification ? (
            !indicator
          ) : null}
        </View>
        {/* verify button */}
        <LinearGradient
          colors={['#C83B62', '#7F35CD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={otpStyle.verifyButton}
        >
          {timeUp ? (
            <TouchableOpacity onPress={() => resetFunctionality()} style={otpStyle.actionLayer}>
              <Text style={otpStyle.buttonText}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleSubmit()} style={otpStyle.actionLayer}>
              <Text style={otpStyle.buttonText}>Verify</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default OTP;
