import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Color, Font } from '../../constants/GlobalStyle';
import React, { useEffect, useState } from 'react';
import { useGetShippingQuery, useUpdateShippingAddressMutation } from '../../redux/api/userSlice';
import CustomLoader from '../customLoader/CustomLoader';
import useKeyboardVisibility from '../../constants/useKeyboad';
import { getFromAsyncStorage } from '../../utils/local-storage';
import { STORAGE_KEY } from '../../constants/storageKey';
import { useGetShippingAddress } from '../../hooks/allHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface addressState {
  streetAddress: string;
  state: string;
  companyName: string;
  zipCode: 0;
}
const ShippingInfo = () => {
  const [formData, setFormData] = useState<addressState>({
    streetAddress: '',
    state: '',
    companyName: '',
    zipCode: 0,
  });
  const { data, setRefetch } = useGetShippingAddress();
  const defaultAdd = data?.data?.find((addess: any) => addess?.isDefault === true);
  const [indicator, setIndicator] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');

  const handleInputChange = (fieldName: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  const handleSubmit = async () => {
    setIndicator(true);

    try {
      if (!defaultAdd?._id) {
        return;
      }

      const response = await fetch(
        `https://api.theqprint.com/api/v1/user-address/${defaultAdd?._id}`,
        {
          method: 'PUT',
          body: JSON.stringify(formData), // Stringify the object
          headers: {
            'Content-Type': 'application/json', // Specify content type
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data: any = await response.json();
      if (data?.success) {
        ToastAndroid.show('Address updated successfully!', ToastAndroid.TOP);
      } else if (data.data.errorMessages && data.data.errorMessages.length > 0) {
        ToastAndroid.show(data.data.errorMessages[0].message, ToastAndroid.LONG);
      } else {
        ToastAndroid.show(data.data.message, ToastAndroid.LONG);
      }
    } catch (error) {
    } finally {
      setIndicator(false);
    }
    setRefetch((prev) => prev + 1);
  };

  const keyboardVisible = useKeyboardVisibility();

  return (
    <View style={styles.bodyContainer}>
      <ScrollView>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.country}>{defaultAdd?.country}</Text>
        <Divider style={styles.dividerStyle} />
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.C_black_eight}
          placeholder={`${defaultAdd?.state}`}
          onChangeText={(text) => handleInputChange('state', text)}
        />

        <Divider style={styles.dividerStyle} />

        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.C_black_eight}
          placeholder={`${defaultAdd?.zipCode}`}
          onChangeText={(text) => handleInputChange('zipCode', parseInt(text))}
          keyboardType="numeric"
        />

        <Divider style={styles.dividerStyle} />

        <Text style={styles.label}>Company Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={defaultAdd?.companyName ? Color.C_black_eight : '#e9e9e9'}
          placeholder={defaultAdd?.companyName ? defaultAdd?.companyName : '(optional)'}
          onChangeText={(text) => handleInputChange('companyName', text)}
        />

        <Divider style={styles.dividerStyle} />

        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.C_black_eight}
          placeholder={`${defaultAdd?.streetAddress}`}
          numberOfLines={2}
          onChangeText={(text) => handleInputChange('streetAddress', text)}
        />

        <Divider style={styles.dividerStyle} />

        <Text style={styles.label}>Phone number</Text>
        <Text style={{ fontSize: Font.Font_L }}>{defaultAdd?.phoneNumber}</Text>

        <Divider style={styles.dividerStyle} />

        {/* Update button */}
      </ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#C83B62', '#7F35CD']}
        style={[styles.updateButton, keyboardVisible && { display: 'none' }]}
      >
        <TouchableOpacity
          onPress={() => handleSubmit()}
          activeOpacity={0.5}
          style={styles.updateButtonTouchAction}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </LinearGradient>
      {indicator && <CustomLoader indicator={indicator} setIndicator={setIndicator} />}
    </View>
  );
};

export default ShippingInfo;

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
  country: {
    fontSize: Font.Font_X,
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
});
