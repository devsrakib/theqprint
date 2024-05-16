import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EmptyDataLogo } from '../../../assets/allSvg/AllSvg';

const EmptyData = ({ children }: { children: string }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 140, height: 140 }}
        source={require('../../../assets/image/emptyData.png')}
      />
      <Text style={{ fontSize: 30, color: 'rgba(0,0,0,0.6)', marginTop: 20 }}>Opp's</Text>
      <Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.4)', marginTop: 10, textAlign: 'center' }}>
        {children}
      </Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
