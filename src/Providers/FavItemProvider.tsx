import React, { createContext } from 'react';
import { View, Text } from 'react-native';
import { useGetFavourite } from '../hooks/allHooks';

interface FavItemContextType {
  data: any;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const FavItemContext = createContext<FavItemContextType | undefined>(undefined);

const FavItemProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, setRefetch } = useGetFavourite();

  return <FavItemContext.Provider value={{ data, setRefetch }}>{children}</FavItemContext.Provider>;
};

export default FavItemProvider;
