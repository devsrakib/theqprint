import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const EmptyData = ({
  children,
  width,
  height,
}: {
  children: string;
  width: number;
  height: number;
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: width, height: height }}
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
    paddingVertical: 20,
  },
});
