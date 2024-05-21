// /**
//  * Edit Profile Component
//  *
//  * This component allows users to edit their profile information including name, email, phone number, and profile picture.
//  *
//  * Features:
//  * - Displays a header with the title "Edit Profile".
//  * - Allows users to upload or capture a new profile picture using the camera or gallery.
//  * - Provides input fields for editing name, email, phone number, and username.
//  * - Includes a button to update the profile information.
//  * - Utilizes LinearGradient for gradient background styling.
//  * - Utilizes StatusBar for configuring the status bar style.
//  * - Utilizes Modal for displaying options to upload a profile picture.
//  *
//  * @returns JSX.Element
//  */

// import { View, Text, TouchableOpacity, Platform, Image, Alert, Button } from 'react-native';
// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { profileStyle } from '../../screen/profile/ProfileStyle';
// import {
//   ColoredCameraIcon,
//   GalleryIcon,
//   ModalCameraIcon,
//   WhiteBackArrow,
// } from '../../../assets/allSvg/AllSvg';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { editProfileStyle } from './EditProfileStyle';
// import * as ImagePicker from 'expo-image-picker';
// import Modal from 'react-native-modal';
// import { StatusBar } from 'expo-status-bar';
// import EditProfileTopTab from '../../routes/material_Tab/EditProfileTopTab';
// import { getFromAsyncStorage } from '../../utils/local-storage';
// import { STORAGE_KEY } from '../../constants/storageKey';
// import { mainUrl } from '../../constants/mainUrl';
// import { useUser } from '../../hooks/allHooks';
// import axios from 'axios';
// import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

// const EditProfile = (props: any) => {
//   const useData = props?.router?.params;
//   const navigation: any = useNavigation();
//   const [collectedProfilePhoto, setCollectedProfilePhoto] = useState<any>(null);
//   const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
//   const [accessToken, setAccessToken] = useState<string>('');
//   const [selectedImage, setSelectedImage] = useState<any>(null);
//   const { data } = useUser();

//   useEffect(() => {
//     const fetchAccessToken = async () => {
//       const token = await getFromAsyncStorage(STORAGE_KEY);
//       setAccessToken(token || ''); // Use empty string as a fallback if token is null
//     };

//     fetchAccessToken();
//   }, []);

//   const pickImage = async () => {
//     // Request permission to access media library
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     // Open image picker
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result?.canceled) {
//       setSelectedImage(result?.assets[0]?.uri);
//     }
//   };

//   const uploadImage = async () => {
//     console.log('::::::: data ::::::::', selectedImage);

//     if (selectedImage) {
//       try {
//         // Convert the image URI to a Blob
//         const fileUri = selectedImage;
//         const formData = new FormData();
//         formData.append('profilePhoto', {
//           uri: fileUri,
//           name: 'profile.jpg',
//           type: 'image/jpeg',
//         } as any);

//         const response = await axios.put('https://api.theqprint.com/api/v1/user/update', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log('::::::: data ::::::::', response.data);
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Upload failed', 'Failed to upload image. Please try again.');
//       }
//     } else {
//       alert('Please select an image first');
//     }
//   };

//   // const responseFromServer = await fetch('https://api.theqprint.com/api/v1/user/update', {
//   //   method: 'PUT',
//   //   body: formData,
//   //   headers: {
//   //     'Content-Type': 'multipart/form-data',
//   //     Authorization: `Bearer ${accessToken}`,
//   //     // Add any additional headers if required, such as authorization
//   //   },
//   // });

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Background gradient */}
//       <LinearGradient
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         colors={['#C83B62', '#7F35CD']}
//         style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 30 : 20 }}>
//         {/* Header section */}
//         <View style={profileStyle.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <WhiteBackArrow />
//           </TouchableOpacity>
//           <Text style={profileStyle.headerTitle}>Edit Profile</Text>
//         </View>
//         {/* Profile section */}
//         <View style={editProfileStyle.userImgCon}>
//           <Image
//             style={editProfileStyle.img}
//             resizeMode="contain"
//             // source={{ uri: `${mainUrl}${data?.data?.profilePhoto}` }}
//             source={{ uri: `${selectedImage}` }}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               setIsCameraModalOpen(true);
//             }}
//             style={editProfileStyle.cameraIcon}>
//             <ColoredCameraIcon />
//           </TouchableOpacity>
//         </View>
//         {/* Body container */}
//         <View style={editProfileStyle.bodyCon}>
//           <EditProfileTopTab image={collectedProfilePhoto} />
//         </View>
//       </LinearGradient>

//       {/* Camera Modal */}
//       <Modal
//         onBackdropPress={() => setIsCameraModalOpen(false)}
//         onBackButtonPress={() => setIsCameraModalOpen(false)}
//         swipeDirection="down"
//         isVisible={isCameraModalOpen}
//         style={{ justifyContent: 'flex-end', margin: 0 }}>
//         <View style={profileStyle.cameraModal}>
//           <View style={profileStyle.cameraModalIndicator} />
//           <Text style={profileStyle.ProfileModalTitle}>Change Profile Picture</Text>
//           <View style={profileStyle.cameraModalContentCon}>
//             <View>
//               <TouchableOpacity
//                 onPress={() => {
//                   pickImage();
//                 }}
//                 style={profileStyle.iconCon}>
//                 <GalleryIcon />
//                 <Text style={profileStyle.profileModalLabel}>Gallery</Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <TouchableOpacity
//                 onPress={() => {
//                   pickImage();
//                   // setIsCameraModalOpen(false);
//                 }}
//                 style={profileStyle.iconCon}>
//                 <ModalCameraIcon />
//                 <Text style={profileStyle.profileModalLabel}>Camera</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Button title="upload phtoto" onPress={() => uploadImage()} />
//         </View>
//       </Modal>
//       {/* StatusBar */}
//       <StatusBar style="dark" />
//     </View>
//   );
// };

// export default EditProfile;

/**
 * Edit Profile Component
 *
 * This component allows users to edit their profile information including name, email, phone number, and profile picture.
 *
 * Features:
 * - Displays a header with the title "Edit Profile".
 * - Allows users to upload or capture a new profile picture using the camera or gallery.
 * - Provides input fields for editing name, email, phone number, and username.
 * - Includes a button to update the profile information.
 * - Utilizes LinearGradient for gradient background styling.
 * - Utilizes StatusBar for configuring the status bar style.
 * - Utilizes Modal for displaying options to upload a profile picture.
 *
 * @returns JSX.Element
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  Button,
  ToastAndroid,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { getFromAsyncStorage } from '../../utils/local-storage'; // Assuming you have a utility function for AsyncStorage
import { STORAGE_KEY } from '../../constants/storageKey'; // Your storage key constant
import { mainUrl } from '../../constants/mainUrl'; // Your main URL constant
import { useUser } from '../../hooks/allHooks'; // Your custom hook for user data
import {
  WhiteBackArrow,
  ColoredCameraIcon,
  GalleryIcon,
  ModalCameraIcon,
} from '../../../assets/allSvg/AllSvg'; // Assuming you have these SVG components
import { profileStyle } from '../../screen/profile/ProfileStyle'; // Profile style
import { editProfileStyle } from './EditProfileStyle'; // Edit profile style
import EditProfileTopTab from '../../routes/material_Tab/EditProfileTopTab'; // Assuming you have a top tab component for editing profile
import { useNavigation } from '@react-navigation/native';

const EditProfile = (props: any) => {
  const item = props?.route?.params;

  const navigation = useNavigation();
  const { data, setRefetch } = useUser();
  const [collectedProfilePhoto, setCollectedProfilePhoto] = useState(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getFromAsyncStorage(STORAGE_KEY);
      setAccessToken(token || '');
    };

    fetchAccessToken();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      resizeImage(result?.assets[0]?.uri);
    }
  };

  const resizeImage = async (imageUri: any) => {
    try {
      const resizedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 1, format: SaveFormat.JPEG }
      );

      setSelectedImage(resizedImage.uri);
    } catch (error) {
      console.error('Failed to resize image:', error);
      Alert.alert('Resize failed', 'Failed to resize image. Please try again.');
    }
  };

  const uploadImage = async () => {
    const image = {
      uri: selectedImage,
      name: 'profile.jpg',
      type: 'image/jpeg',
    };
    try {
      const formData = new FormData();
      formData.append('profilePhoto', image);

      const response = await axios.put(`${mainUrl}api/v1/user/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data) {
        setRefetch((prev) => prev + 1);
        ToastAndroid.show('Profile updated successfully!', ToastAndroid.TOP);
      }
    } catch (error) {
      ToastAndroid.show('sothing went wrong!', ToastAndroid.TOP);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      uploadImage();
      setRefetch((prev) => prev + 1);
    }
  }, [selectedImage]);
  // console.log('::::::::', JSON.stringify(data?.data?.profilePhoto, null, 2));

  return (
    <View style={{ flex: 1 }}>
      {/* Background gradient */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#C83B62', '#7F35CD']}
        style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 30 : 20 }}>
        {/* Header section */}
        <View style={profileStyle.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <WhiteBackArrow />
          </TouchableOpacity>
          <Text style={profileStyle.headerTitle}>Edit Profile</Text>
        </View>
        {/* Profile section */}
        <View style={editProfileStyle.userImgCon}>
          <Image
            style={editProfileStyle.img}
            resizeMode="cover"
            source={{ uri: selectedImage || `${mainUrl}${data?.data?.profilePhoto}` }}
          />
          <TouchableOpacity onPress={() => pickImage()} style={editProfileStyle.cameraIcon}>
            <ColoredCameraIcon />
          </TouchableOpacity>
        </View>
        {/* Body container */}
        <View style={editProfileStyle.bodyCon}>
          <EditProfileTopTab />
        </View>
      </LinearGradient>

      {/* Camera Modal */}
      <Modal
        onBackdropPress={() => setIsCameraModalOpen(false)}
        onBackButtonPress={() => setIsCameraModalOpen(false)}
        swipeDirection="down"
        isVisible={isCameraModalOpen}
        style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={profileStyle.cameraModal}>
          <View style={profileStyle.cameraModalIndicator} />
          <Text style={profileStyle.ProfileModalTitle}>Change Profile Picture</Text>
          <View style={profileStyle.cameraModalContentCon}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  pickImage();
                }}
                style={profileStyle.iconCon}>
                <GalleryIcon />
                <Text style={profileStyle.profileModalLabel}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIsCameraModalOpen(false);
                }}
                style={profileStyle.iconCon}>
                <ModalCameraIcon />
                <Text style={profileStyle.profileModalLabel}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button title="Upload Photo" onPress={uploadImage} />
        </View>
      </Modal>
      {/* StatusBar */}
      <StatusBar style="dark" />
    </View>
  );
};

export default EditProfile;
