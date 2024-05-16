import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { notificationItemStyle } from './NotificationItemStyle';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { INotification } from '../../types/interfaces/notify.interface';
import { CustomTouchable } from '../../shared/CustomTouchable';
import { formatDateShorting } from '../../utils/formatDateShorting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotification } from '../../hooks/allHooks';

const NotificationItem = ({ item }: { item: INotification }) => {
  const navigation: any = useNavigation();
  const { data, isLoading, setRefetch } = useNotification();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  // useEffect(() => {
  //   setRefetch((prev) => prev + 1);
  // }, [data]);

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`https://api.theqprint.com/api/v1/notification/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setRefetch((prev) => prev + 1);
      }
    } catch (error) {
    } finally {
      setRefetch((prev) => prev + 1);
    }
  };

  return (
    <CustomTouchable
      onPress={() => {
        navigation.navigate('TrackedOrderDetails', { ...item });
        handleUpdate(item?._id);
      }}
      activeOpacity={0.7}
      style={[
        notificationItemStyle.container,
        { backgroundColor: item?.isReaded ? '#fff' : 'rgba(255, 0, 0, 0.03)' },
      ]}
      entering={FadeInDown.delay(50).duration(50).damping(10).springify()}
    >
      <View style={notificationItemStyle.logoContainer}>
        <Image
          style={notificationItemStyle.logo}
          //  source={{ uri: `${mainUrl}${item}` }}
        />
      </View>
      <View style={notificationItemStyle.specCon}>
        <Text numberOfLines={2} style={notificationItemStyle.title}>
          {item?.title}
        </Text>
        <Text numberOfLines={2} style={notificationItemStyle.subTitle}>
          {item?.subTitle}
        </Text>
        <View style={notificationItemStyle.currencyAndDayCon}>
          <Text style={notificationItemStyle.currency}>{item?.price} QAR</Text>
          <Text style={notificationItemStyle.days}>{formatDateShorting(item?.createdAt)}</Text>
        </View>
      </View>
    </CustomTouchable>
  );
};

export default NotificationItem;
