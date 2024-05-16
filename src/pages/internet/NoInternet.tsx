// // NetworkStatus.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
//   BackHandler,
// } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import Modal from 'react-native-modal';
// import { Color } from '../../constants/GlobalStyle';

// const NetworkStatus = () => {
//   const [isConnected, setIsConnected] = useState<boolean | undefined>(true); // Default to true
//   const [isWifi, setIsWifi] = useState(false);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state: any) => {
//       setIsConnected(state.isConnected);
//       setIsWifi(state.type === 'wifi');
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const toggleModal = () => {
//     setIsConnected(false);
//   };

//   useEffect(() => {
//     const backAction = () => {
//       BackHandler.exitApp();
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     return () => backHandler.remove();
//   }, []);

//   return (
//     <View>
//       {!isWifi && (
//         <Modal
//           swipeDirection="down"
//           onSwipeComplete={() => toggleModal()}
//           isVisible={isConnected}
//           backdropOpacity={1}
//           backdropColor="#fff"
//           style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
//         >
//           <Image
//             style={{ width: '50%', height: 200 }}
//             source={require('../../../assets/image/internetIcon.jpg')}
//           />
//           <Text style={{ fontSize: 24, color: Color.C_main, marginBottom: 20 }}>No Internet</Text>
//           <Text style={{ fontSize: 16, color: Color.C_main }}>
//             Please check your internet connection
//           </Text>
//           <TouchableOpacity
//             style={{
//               backgroundColor: Color.C_shadow,
//               width: 140,
//               borderRadius: 5,
//               height: 40,
//               alignSelf: 'center',
//               marginTop: 80,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//             onPress={() => BackHandler.exitApp()}
//           >
//             <Text style={{ color: Color.C_main }}>Close app</Text>
//           </TouchableOpacity>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default NetworkStatus;
