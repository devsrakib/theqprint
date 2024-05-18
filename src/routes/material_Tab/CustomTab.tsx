import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ProductReviews from '../../components/productReviews/ProductReviews';
import ProductSpec from '../../components/productSpec/ProductSpec';
import { Color, Font } from '../../constants/GlobalStyle';
import { tabName } from '../../constants/customMaterialTopTab';
import { IProduct } from '../../types/interfaces/product.interface';

interface tabProps {
  id: number;
  tab: string;
}
const CustomTab = ({ item }: { item: IProduct }) => {
  const [tabIndex, setTabIndex] = useState(1);

  const handleTab = (index: any) => {
    setTabIndex(index);
  };

  return (
    <>
      <View style={styles.container}>
        {tabName?.map((tab: tabProps) => {
          return (
            <TouchableOpacity
              onPress={() => handleTab(tab?.id)}
              style={[
                styles.tabContainer,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: tabIndex === tab?.id ? Color.C_main : 'white',
                },
              ]}>
              <Text
                style={[
                  styles.tabName,
                  { color: tabIndex === tab?.id ? Color.C_main : Color.C_H_black },
                ]}>
                {tab?.tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        {tabIndex === 1 ? (
          <ProductSpec item={item?.specifications} />
        ) : (
          tabIndex === 2 && <ProductReviews item={item} />
        )}
      </View>
    </>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: Color.C_white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Color.C_border,
    borderBottomWidth: 1,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  tabName: {
    fontSize: Font.Font_L,
  },
});
