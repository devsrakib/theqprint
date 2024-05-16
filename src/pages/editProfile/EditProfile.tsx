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

import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { profileStyle } from '../../screen/profile/ProfileStyle';
import {
  ColoredCameraIcon,
  GalleryIcon,
  ModalCameraIcon,
  WhiteBackArrow,
} from '../../../assets/allSvg/AllSvg';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { editProfileStyle } from './EditProfileStyle';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';
import EditProfileTopTab from '../../routes/material_Tab/EditProfileTopTab';
import { Color } from '../../constants/GlobalStyle';
import { useGetMeQuery, useUpdateMyAddressMutation } from '../../redux/api/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import * as FileSystem from 'expo-file-system';
import { setProfilePhoto } from '../../redux/features/updateMyAddresSlice';
import { getFromAsyncStorage } from '../../utils/local-storage';
import { STORAGE_KEY } from '../../constants/storageKey';
import { mainUrl } from '../../constants/mainUrl';
import { useUser } from '../../hooks/allHooks';

const EditProfile = (props: any) => {
  const useData = props?.router?.params;
  const navigation: any = useNavigation();
  const [collectedProfilePhoto, setCollectedProfilePhoto] = useState<any>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
  const { data } = useUser();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getFromAsyncStorage(STORAGE_KEY);
      setAccessToken(token || ''); // Use empty string as a fallback if token is null
    };

    fetchAccessToken();
  }, []);

  // const selectImage = async (useLibrary: boolean) => {
  //   try {
  //     // Define options for image picker
  //     const options: ImagePicker.ImagePickerOptions = {
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 0.75,
  //     };

  //     // Use library or camera based on the flag
  //     const result = useLibrary
  //       ? await ImagePicker.launchImageLibraryAsync(options)
  //       : (await ImagePicker.requestCameraPermissionsAsync()) &&
  //         (await ImagePicker.launchCameraAsync(options));

  //     // If the user cancels, do nothing
  //     if (result.canceled) return;

  //     // If an image is selected, save it
  //     console.log('result from selectImage', result.assets);

  //     // saveImage(result.assets[0].uri);
  //   } catch (error) {
  //     console.error('Error selecting image:', error);
  //     // Handle error
  //   }
  // };

  const selectImage = async (useLibrary: boolean) => {
    try {
      // Define options for image picker
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
      };

      // Use library or camera based on the flag
      const result = useLibrary
        ? await ImagePicker.launchImageLibraryAsync(options)
        : (await ImagePicker.requestCameraPermissionsAsync()) &&
          (await ImagePicker.launchCameraAsync(options));

      // If the user cancels, do nothing
      if (result.canceled) return;

      // Extract URI from result and pass it to saveImage
      saveImage(result.assets[0]?.uri);
    } catch (error) {
      // Handle error
    }
  };

  const saveImage = async (imageUri: string) => {
    try {
      const formData = new FormData();
      // Append the image URI to formData
      formData.append('profilePhoto', imageUri);

      // Make a PUT request to send the formData to the backend
      const responseFromServer = await fetch('https://api.theqprint.com/api/v1/user/update', {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          // Add any additional headers if required, such as authorization
        },
      });

      // Handle the response from the server
      const data = await responseFromServer.json();

      // Update profile photo URL in state to trigger re-render with new image
      setProfilePhotoUrl(imageUri);

      // Close the camera modal or any other modal if required
      setIsCameraModalOpen(false);
    } catch (error: any) {
      // Handle error
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background gradient */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#C83B62', '#7F35CD']}
        style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 30 : 20 }}
      >
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
            source={{ uri: `${mainUrl}${data?.data?.profilePhoto}` }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsCameraModalOpen(true);
            }}
            style={editProfileStyle.cameraIcon}
          >
            <ColoredCameraIcon />
          </TouchableOpacity>
        </View>
        {/* Body container */}
        <View style={editProfileStyle.bodyCon}>
          <EditProfileTopTab image={collectedProfilePhoto} />
        </View>
      </LinearGradient>

      {/* Camera Modal */}
      <Modal
        onBackdropPress={() => setIsCameraModalOpen(false)}
        onBackButtonPress={() => setIsCameraModalOpen(false)}
        swipeDirection="down"
        isVisible={isCameraModalOpen}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={profileStyle.cameraModal}>
          <View style={profileStyle.cameraModalIndicator} />
          <Text style={profileStyle.ProfileModalTitle}>Change Profile Picture</Text>
          <View style={profileStyle.cameraModalContentCon}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  selectImage(true);
                }}
                style={profileStyle.iconCon}
              >
                <GalleryIcon />
                <Text style={profileStyle.profileModalLabel}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  selectImage(false);
                  // setIsCameraModalOpen(false);
                }}
                style={profileStyle.iconCon}
              >
                <ModalCameraIcon />
                <Text style={profileStyle.profileModalLabel}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* StatusBar */}
      <StatusBar style="dark" />
    </View>
  );
};

export default EditProfile;
