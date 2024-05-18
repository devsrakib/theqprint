// NetworkStatus.js
import NetInfo from '@react-native-community/netinfo';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Color } from '../../constants/GlobalStyle';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | undefined>(true); // Default to true
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleModal = () => {
    setIsConnected(false);
  };
  return (
    <View>
      {!isConnected && (
        <Modal
          onSwipeComplete={() => toggleModal()}
          isVisible={isConnected}
          backdropOpacity={1}
          backdropColor="#fff"
          style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}>
          <Image
            style={{ width: '40%', height: 180 }}
            resizeMode="contain"
            source={require('../../../assets/image/internetConnection.png')}
          />
          <Text style={{ fontSize: 24, color: Color.C_main, marginBottom: 20 }}>No Internet</Text>
          <Text style={{ fontSize: 16, color: Color.C_main }}>
            Please check your internet connection
          </Text>
          {/* <TouchableOpacity
            style={{
              backgroundColor: Color.C_shadow,
              width: 140,
              borderRadius: 5,
              height: 40,
              alignSelf: 'center',
              marginTop: 80,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: Color.C_main }}>Reload app</Text>
          </TouchableOpacity> */}
        </Modal>
      )}
    </View>
  );
};

export default NetworkStatus;
