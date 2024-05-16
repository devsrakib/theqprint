import React, { createContext, useState } from 'react';
import { View, Text } from 'react-native';
import { useGetFavourite } from '../hooks/allHooks';

interface CartItemContextType {
  cart: any;
  setCart: Function;
}

export const CartItemContext = createContext<any | undefined>(undefined);

const CartItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<null | any>(null);

  return <CartItemContext.Provider value={{ cart, setCart }}>{children}</CartItemContext.Provider>;
};

export default CartItemProvider;
