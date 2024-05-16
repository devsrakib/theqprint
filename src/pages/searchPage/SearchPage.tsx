import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Magnify } from '../../../assets/allSvg/AllSvg';
import { searchPageStyle } from './SearchPageStyle';

const SearchPage = () => {
  return (
    <SafeAreaView style={searchPageStyle.container}>
      <View style={searchPageStyle.searchContainer}>
        <Magnify />
        <TextInput style={searchPageStyle.input} placeholder="Search" />
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
