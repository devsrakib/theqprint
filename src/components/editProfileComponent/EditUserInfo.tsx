import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Color, Font } from '../../constants/GlobalStyle';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { StatusBar } from 'expo-status-bar';
import { STORAGE_KEY } from '../../constants/storageKey';
import { getFromAsyncStorage } from '../../utils/local-storage';
import CustomLoader from '../customLoader/CustomLoader';
import useKeyboardVisibility from '../../constants/useKeyboad';
import { useUser } from '../../hooks/allHooks';

const EditUserInfo = () => {
  const { data, setRefetch } = useUser();
  const [updateMessage, setUpdateMessage] = useState<unknown>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [indicator, setIndicator] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('+974');
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [changePass, setChangePass] = useState<string>('');
  const [changeUInfo, setChangeUInfo] = useState<string>('');
  const keyboardVisible = useKeyboardVisibility();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  //@ts-ignore
  const passError = updateMessage?.data?.errorMessages;

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getFromAsyncStorage(STORAGE_KEY);
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const handleUserSubmit = async () => {
    setIndicator(true);
    setChangeUInfo('UINFO');
    setErrorMessage('');
    const formData = new FormData();
    if (fullName) {
      formData.append('fullName', fullName);
    }
    if (phoneNumber) {
      formData.append('phoneNumber', phoneNumber);
    }

    try {
      const response = await fetch('https://api.theqprint.com/api/v1/user/update', {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assuming response is JSON
      const data = await response.json();

      setSuccessMessage(data?.success);
      if (!response.ok) {
        if (data.errorMessages && data.errorMessages.length > 0) {
          setErrorMessage(data.errorMessages[0].message);
        } else {
          setErrorMessage(data.message); // Set general error message from server
        }
      }
      setRefetch((prev) => prev + 1);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setRefetch((prev) => prev + 1);
      setIndicator(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setIndicator(true);
    setChangePass('CHANGEPASS');
    // Clear previous error message
    setErrorMessage('');

    // Create formData object
    const updateData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch('https://api.theqprint.com/api/v1/user/change-password', {
        method: 'PUT',
        body: JSON.stringify(updateData), // Stringify the object
        headers: {
          'Content-Type': 'application/json', // Specify content type
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assuming response is JSON
      const data = await response.json();

      setSuccessMessage(data?.success);
      if (!response.ok) {
        if (data.errorMessages && data.errorMessages.length > 0) {
          setErrorMessage(data.errorMessages[0].message);
        } else {
          setErrorMessage(data.message); // Set general error message from server
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIndicator(false);
    }
  };

  const handleFormSubmit = async () => {
    if (changePass === 'CHANGEPASS' && changeUInfo === 'UINFO') {
      await handleUserSubmit();
      await handlePasswordSubmit();
    } else if (changeUInfo === 'UINFO') {
      handleUserSubmit();
    } else if (changePass === 'CHANGEPASS' && oldPassword?.length !== 0) {
      handlePasswordSubmit();
    } else {
    }
  };

  useEffect(() => {
    if (data?.data?.fullName) {
      setFullName(data?.data?.fullName);
      setPhoneNumber(data?.data?.phoneNumber);
    }
  }, [data]);
  console.log(data);

  return (
    <View style={styles.bodyContainer}>
      <ScrollView>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter you name`}
          value={`${fullName}`}
          onChangeText={(e) => setFullName(e)}
          onFocus={() => setChangeUInfo('UINFO')}
        />
        <Divider
          style={[
            styles.dividerStyle,
            { backgroundColor: errorMessage ? Color.C_main : Color.C_border },
          ]}
        />
        <Text style={styles.label}>Phone Number</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: Font.Font_X, marginRight: 5 }}>+974</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder={`Enter you phone`}
            value={phoneNumber}
            onChangeText={(e) => setPhoneNumber(e)}
            keyboardType="numeric"
            onFocus={() => setChangeUInfo('UINFO')}
            maxLength={8}
          />
        </View>
        <Divider
          style={[
            styles.dividerStyle,
            { backgroundColor: errorMessage ? Color.C_main : Color.C_border },
          ]}
        />
        <View style={styles.passwordTextCon}>
          {(errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>) ||
            (successMessage === true && (
              <Text style={[styles.errorText, { color: 'green' }]}>Update Successfully</Text>
            ))}
          <Text style={styles.updatePassText}>Update password</Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <Text style={[styles.label, { color: passError ? 'red' : 'lightgray' }]}>
          {passError ? passError : 'old password'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter your old password`}
          onChangeText={(e) => setOldPassword(e)}
          onFocus={() => setChangePass('CHANGEPASS')}
        />

        <Divider style={styles.dividerStyle} />

        <Text style={[styles.label, { color: passError ? 'red' : 'lightgray' }]}>
          {passError ? passError : 'New password'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter your new password`}
          onChangeText={(e) => setNewPassword(e)}
        />
        <Divider style={styles.dividerStyle} />
        <Text style={[styles.label, { color: passError ? 'red' : 'lightgray' }]}>
          {passError ? passError : 'Confirm password'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter your confirm password`}
          onChangeText={(e) => setConfirmPassword(e)}
        />

        <Divider style={styles.dividerStyle} />
        {/* Update button */}
      </ScrollView>
      {indicator && <CustomLoader indicator={indicator} setIndicator={setIndicator} />}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#C83B62', '#7F35CD']}
        style={[styles.updateButton, keyboardVisible && { display: 'none' }]}>
        <TouchableOpacity
          onPress={() => handleFormSubmit()}
          activeOpacity={0.5}
          style={styles.updateButtonTouchAction}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </LinearGradient>
      <StatusBar style="dark" />
    </View>
  );
};

export default EditUserInfo;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingTop: 10,
  },
  label: {
    fontSize: Font.Font_L,
    color: 'rgba(0,0,0,0.3)',
    marginVertical: 10,
  },
  input: {
    fontSize: Font.Font_X,
  },
  dividerStyle: {
    marginTop: 10,
  },
  updateButton: {
    width: '85%',
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    // marginTop: 'auto',
    marginTop: 'auto',
    marginBottom: 20,
  },
  showButton: {
    display: 'none',
  },
  updateButtonTouchAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: Font.Font_X,
    color: Color.C_white,
  },
  passwordTextCon: {
    // marginTop: 50,
    height: 70,
  },
  updatePassText: {
    fontWeight: '600',
    fontSize: Font.Font_X,
    color: Color.C_black_eight,
    marginTop: 'auto',
  },
  errorText: {
    fontSize: Font.Font_L,
    color: Color.C_main,
    marginTop: 10,
  },
});
