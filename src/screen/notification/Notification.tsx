/**
 * Notification Component
 *
 * This component displays a list of notifications, categorized by day.
 *
 * Features:
 * - Utilizes a CommonHeader component to display the title "Notification" at the top.
 * - Renders a list of notifications, with each notification represented by the NotificationItem component.
 * - Groups notifications by day, displaying the "Today" section for notifications received on the current day.
 * - Utilizes ScrollView to enable scrolling through the list of notifications.
 * - Includes StatusBar for configuring the status bar style.
 *
 * @returns JSX.Element
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';

import { notificationStyle } from './NotificationStyle';
import EmptyData from '../../components/common/EmptyData';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import NotificationItem from '../../components/notificationItem/NotificationItem';
import NotificationSkeleton from '../../components/skeleton/notification.skeleton';
import CustomActivityLoader from '../../constants/CustomAcitvityLoader';
import { useNotification } from '../../hooks/allHooks';
import { INotification } from '../../types/interfaces/notify.interface';
const Notification = () => {
  const { data, isLoading, setRefetch } = useNotification();
  const [refreshing, setRefreshing] = useState(false);

  const [items, setItems] = useState<INotification[]>([]);
  const [meta, setMeta] = useState({ limit: 5, page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token || '');
    };

    fetchAccessToken();
  }, []);
  const handleRefresh = () => {
    setRefreshing(true);
    setRefetch((prev) => prev + 1);
    setRefreshing(false);
  };

  useEffect(() => {
    setRefetch((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (data) {
      setItems(data?.data);
      setMeta(data?.meta);
    }
  }, [data]);

  const fetchData = async () => {
    if (!loading && meta.page * meta.limit < meta.total) {
      setLoading(true);
      const response = await fetch(
        `https://api.theqprint.com/api/v1/notification/me?page=${meta.page + 1}&limit=${meta.limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const jsonData = await response.json();
      setItems([...items, ...jsonData.data]);
      setMeta(jsonData.meta);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => <NotificationItem item={item} />;

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <CustomActivityLoader />
        </View>
      );
    } else {
      return null;
    }
  };

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: 'Here is the notification body',
  //       data: { data: 'goes here' },
  //     },
  //     trigger: { seconds: 2 },
  //   });
  // }

  return (
    <View style={notificationStyle.container}>
      {/* Common Header */}
      <CommonHeader title="Notification" cartBox={true} />

      {/* Body Section */}
      {isLoading ? (
        <FlatList
          data={[...Array(10)]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <NotificationSkeleton />;
          }}
        />
      ) : (
        <View style={notificationStyle.bodyContainer}>
          {/* List of Notifications */}
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: any, index) => `${item.key}${index}`}
            onEndReached={fetchData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            removeClippedSubviews
            contentContainerStyle={{ flex: 1 }}
            ListEmptyComponent={<EmptyData children="No Notifications" width={140} height={140} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />
          {/* {data?.data?.map((item: INotification) => {
          return <NotificationItem key={item?._id} item={item} />;
        })} */}
        </View>
      )}
      {/* { && } */}
      {/* StatusBar Configuration */}
      <StatusBar style="dark" />
    </View>
  );
};

export default Notification;
