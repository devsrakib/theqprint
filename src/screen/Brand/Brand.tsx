// /**
//  * Brand Component
//  *
//  * This component renders a list of top brands and all brands in a scrollable view.
//  *
//  * Features:
//  * - Utilizes a CommonHeader component to display the title "Brand" at the top.
//  * - Displays a list of top brands horizontally using FlatList and TopBrand component.
//  * - Renders all brands vertically using FlatList and AllBrand component.
//  * - Integrates animations such as FadeInDown, FadeInLeft, and FadeInRight for visual effects.
//  * - Implements SafeAreaView and StatusBar for better layout and status bar configuration.
//  *
//  * @returns JSX.Element
//  */

// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
// import Animated, { FadeInRight } from 'react-native-reanimated';

// import { brandStyle } from './BrandStyle';
// import AllBrand from './allBrand/AllBrand';
// import TopBrand from './topBrand/TopBrand';
// import CommonHeader from '../../components/common/commonHeader/CommonHeader';
// import BrandCartSkeleton from '../../components/skeleton/Brand.cart.skeleton';
// import BrandCircleSkeleton from '../../components/skeleton/Brand.circle.skeleton';
// import CustomActivityLoader from '../../constants/CustomAcitvityLoader';
// import { Color } from '../../constants/GlobalStyle';
// import { useBrand } from '../../hooks/allHooks';
// import { IBrand } from '../../types/interfaces/product.interface';

// const Brand = () => {
//   const { data, isLoading } = useBrand();

//   const [items, setItems] = useState<IBrand[]>([]);
//   const [meta, setMeta] = useState({ limit: 10, page: 1, total: 0 });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isLoading && data) {
//       setItems(data.data);
//       setMeta(data.meta);
//     }
//   }, [data, isLoading]);

//   const fetchData = async () => {
//     if (!loading && meta.page * meta.limit < meta.total) {
//       setLoading(true);
//       const response = await fetch(
//         `https://api.theqprint.com/api/v1/brand?page=${meta.page + 1}&limit=${meta.limit}`
//       );
//       const jsonData = await response.json();
//       setItems([...items, ...jsonData.data]);
//       setMeta(jsonData.meta);
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }: any) => <AllBrand item={item} />;

//   const renderFooter = () => {
//     if (loading) {
//       return (
//         <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
//           <CustomActivityLoader />
//         </View>
//       );
//     } else {
//       return null;
//     }
//   };
//   return (
//     <View style={brandStyle.container}>
//       {/* Custom Header */}
//       <CommonHeader title="Brand" cartBox />

//       {/* Body Container */}
//       <ScrollView>
//         <View style={brandStyle.bodyContainer}>
//           <Text style={brandStyle.topBrandText}>Top Brand</Text>

//           {/* Top Brand Section */}
//           {isLoading ? (
//             <BrandCircleSkeleton />
//           ) : (
//             <Animated.FlatList
//               entering={FadeInRight.delay(50).duration(500)}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingRight: 20 }}
//               data={data?.data}
//               renderItem={({ item }) => <TopBrand item={item} />}
//               keyExtractor={(item, index) => index.toString()} // Add key extractor
//             />
//           )}

//           {/* All Brand Container */}
//           <View style={brandStyle.allBrandContainer}>
//             <Text style={brandStyle.allBrandText}>All Brand</Text>
//             {isLoading ? (
//               <BrandCartSkeleton />
//             ) : (
//               <Animated.View style={brandStyle.allCartContainer}>
//                 {/* Render All Brands */}
//                 <FlatList
//                   data={items}
//                   keyExtractor={(item: any, index) => `${item.key}${index}`}
//                   onEndReached={fetchData}
//                   onEndReachedThreshold={0.5}
//                   ListFooterComponent={renderFooter}
//                   numColumns={2}
//                   removeClippedSubviews
//                   renderItem={renderItem}
//                   contentContainerStyle={{ justifyContent: 'space-between' }}
//                 />
//                 {/* {items?.map((item: IBrand, index: number) => {
//                   return <AllBrand key={item?.brandId} item={item} />; // all brand cart
//                 })} */}
//               </Animated.View>
//             )}
//           </View>
//         </View>
//       </ScrollView>

//       {/* StatusBar Configuration */}
//       <StatusBar style="dark" />
//     </View>
//   );
// };

// export default Brand;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.C_white,
//     paddingHorizontal: 10,
//   },
//   listContainer: {
//     justifyContent: 'space-between',
//   },
//   itemContainer: {
//     flex: 0.5, // Make each item take half of the available width (for 2 columns)
//     padding: 8, // Add padding for spacing between items
//   },
// });

/**
 * Brand Component
 *
 * This component renders a list of top brands and all brands in a scrollable view.
 *
 * Features:
 * - Utilizes a CommonHeader component to display the title "Brand" at the top.
 * - Displays a list of top brands horizontally using FlatList and TopBrand component.
 * - Renders all brands vertically using FlatList and AllBrand component.
 * - Integrates animations such as FadeInDown, FadeInLeft, and FadeInRight for visual effects.
 * - Implements SafeAreaView and StatusBar for better layout and status bar configuration.
 *
 * @returns JSX.Element
 */

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { brandStyle } from './BrandStyle';
import AllBrand from './allBrand/AllBrand';
import TopBrand from './topBrand/TopBrand';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import BrandCartSkeleton from '../../components/skeleton/Brand.cart.skeleton';
import BrandCircleSkeleton from '../../components/skeleton/Brand.circle.skeleton';
import { Color } from '../../constants/GlobalStyle';
import { useBrand } from '../../hooks/allHooks';
import { IBrand } from '../../types/interfaces/product.interface';

const Brand = () => {
  const { data, isLoading } = useBrand();

  const [state, setState] = useState({
    items: [],
    meta: { limit: 10, page: 1, total: 0 },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      setState({ items: data.data, meta: data.meta });
    }
  }, [data, isLoading]);

  const fetchData = async () => {
    if (!loading && state.meta.page * state.meta.limit < state.meta.total) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.theqprint.com/api/v1/brand?page=${state.meta.page + 1}&limit=${state.meta.limit}`
        );
        const jsonData = await response.json();
        setState((prevState) => ({
          items: [...prevState.items, ...jsonData.data],
          meta: jsonData.meta,
        }));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderItem = ({ item }: { item: IBrand }) => <AllBrand item={item} />;

  const renderFooter = () => {
    return loading ? (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color={Color.C_main} />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <CommonHeader title="Brand" cartBox />

      {/* Body Container */}
      <Animated.ScrollView>
        <View style={styles.bodyContainer}>
          <Text style={styles.topBrandText}>Top Brand</Text>

          {/* Top Brand Section */}
          {isLoading ? (
            <BrandCircleSkeleton />
          ) : (
            <Animated.FlatList
              entering={FadeInRight.delay(50).duration(500)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              data={data?.data}
              renderItem={({ item }) => <TopBrand item={item} />}
              keyExtractor={(item) => item.key.toString()} // Use unique key
            />
          )}

          {/* All Brand Container */}
          <View style={styles.allBrandContainer}>
            <Text style={styles.allBrandText}>All Brand</Text>
            {isLoading ? (
              <BrandCartSkeleton />
            ) : (
              <FlatList
                data={state.items}
                keyExtractor={(item) => item.brandId.toString()} // Use unique key
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                numColumns={2}
                removeClippedSubviews
                renderItem={renderItem}
                contentContainerStyle={styles.allCartContainer}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
              />
            )}
          </View>
        </View>
      </Animated.ScrollView>

      {/* StatusBar Configuration */}
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.C_white,
    paddingHorizontal: 10,
  },
  bodyContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  topBrandText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalList: {
    paddingRight: 20,
  },
  allBrandContainer: {
    marginTop: 20,
  },
  allBrandText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  allCartContainer: {
    justifyContent: 'space-between',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default Brand;
