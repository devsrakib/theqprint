import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Color, Font } from '~/constants/GlobalStyle';
import { Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CartItemContext } from '~/Providers/CartItemProvider';
import { CartBag } from 'assets/allSvg/AllSvg';

const HeaderCartIcon = () => {
  const navigation = useNavigation<any>();
  const { cart } = useContext(CartItemContext);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MyCart')}
      activeOpacity={0.7}
      style={styles.cartIcon}>
      <CartBag />
      {cart?.data?.products?.length !== 0 && (
        <View style={styles.badge}>
          <Text style={styles.text}>{cart?.data?.products?.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HeaderCartIcon;

const styles = StyleSheet.create({
  cartIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: -5,
    width: 20,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: Color.C_main,
    borderRadius: 8,
  },
  text: {
    color: Color.C_white,
    fontSize: Font.Font_S,
  },
});
