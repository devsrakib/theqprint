import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { newPassStyle } from './NewPassStyle';
import CommonHeader from '../../../components/common/commonHeader/CommonHeader';
import { BackArrow, Eye, EyeOf } from '../../../../assets/allSvg/AllSvg';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomAnimatedLogo from '../../../components/customLogo/CustomAnimatedLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../../components/customLoader/CustomLoader';

const NewPass = () => {
  const navigation: any = useNavigation();
  const [newPassView, setNewPassView] = useState(true);
  const [conPass, setConPass] = useState(true);
  const [indicator, setIndicator] = useState<boolean>(false);
  const [newPass, setNewPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [varification, setVarification] = useState<string>('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const handleResetPass = async () => {
    setIndicator(true);
    const data = {
      newPassword: newPass,
      confirmPassword: confirmPass,
    };

    try {
      const response = await fetch('https://api.theqprint.com/api/v1/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        navigation.navigate('login');
      }
      // setRefetch((prev) => prev + 1);
      setVarification(result?.errorMessages[0]?.message);
    } catch (error) {
      // Handle error here
    } finally {
      setIndicator(false);
    }
  };

  return (
    <View style={newPassStyle.container}>
      {/* header container */}
      <View style={newPassStyle.gradientContainer}>
        <Image
          style={newPassStyle.gradientImg}
          // source={require('../ image/LoginGradient.png')}
          source={require('../../../../assets/image/LoginGradient.png')}
        />
      </View>
      <CustomAnimatedLogo />
      {/* body container */}
      <ScrollView>
        <View style={newPassStyle.bodyCon}>
          <Text style={newPassStyle.text1}>Change Password</Text>
          <Text style={newPassStyle.text2}>
            Set the password for your account so you can access all the features.
          </Text>
          {/* password input and label container */}
          <View style={newPassStyle.labelAndInputCon}>
            <Text style={newPassStyle.label}>New Password</Text>
            <View style={newPassStyle.inputCon}>
              <TextInput
                secureTextEntry={newPassView}
                style={newPassStyle.input}
                placeholder="New password"
                onChangeText={(e) => setNewPass(e)}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={() => setNewPassView(!newPassView)}>
                {newPassView ? <EyeOf /> : <Eye />}
              </TouchableOpacity>
            </View>
          </View>
          <View style={newPassStyle.labelAndInputCon}>
            <Text style={newPassStyle.label}>Confirm Password</Text>
            <View style={newPassStyle.inputCon}>
              <TextInput
                secureTextEntry={conPass}
                style={newPassStyle.input}
                placeholder="Confirm password"
                onChangeText={(e) => setConfirmPass(e)}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={() => setConPass(!conPass)}>
                {conPass ? <EyeOf /> : <Eye />}
              </TouchableOpacity>
            </View>
          </View>
          {varification && (
            <View style={newPassStyle.errorMessagesCon}>
              <Text style={newPassStyle.errorMessage}>{varification}</Text>
            </View>
          )}
          {/* save password button */}
          <LinearGradient
            colors={['#C83B62', '#7F35CD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={newPassStyle.saveButton}
          >
            <TouchableOpacity onPress={() => handleResetPass()} style={newPassStyle.actionLayer}>
              <Text style={newPassStyle.buttonText}>Save new password</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
      <CustomLoader indicator={indicator} setIndicator={setIndicator} />
    </View>
  );
};

export default NewPass;
