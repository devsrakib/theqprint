import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { contactUsStyle } from './ContactUsStyle';
import { MessageBox, Messenger, Whatsapp } from '../../../../assets/allSvg/AllSvg';
import { useGetSocialMediaQuery } from '../../../redux/api/socialMediaSlice';
import { Media } from '../../../types/interfaces/socialMedia.interface';
import { useContacts } from '../../../hooks/allHooks';

const ContactUs = () => {
  const { data } = useContacts();
  const mediaButtonColors: { [key: string]: string } = {};

  // Iterate through the data to determine button colors
  data?.data?.forEach((media: Media) => {
    if (media.mediaName === 'Messenger') {
      mediaButtonColors['Messenger'] = '#097DFF';
    } else if (media.mediaName === 'Whatsapp') {
      mediaButtonColors['Whatsapp'] = '#25D366';
    }
  });

  const handlePress = (media: Media) => {
    if (media?.mediaName === 'Messenger' && media?.userName) {
      Linking.openURL(`https://m.me/${media?.userName}`);
    } else if (media.mediaName === 'Whatsapp' && media?.phoneNumber) {
      Linking.openURL(`https://wa.me/${media?.phoneNumber}`);
    }
  };

  return (
    <View style={contactUsStyle.container}>
      <Text style={contactUsStyle.title}>Contact Us</Text>
      <Text style={contactUsStyle.subText}>Contact with us by using Messenger and Whatsapp</Text>
      {data?.data?.map((media: Media) => (
        <TouchableOpacity
          key={media?._id} // Ensure each TouchableOpacity has a unique key
          activeOpacity={0.7}
          style={[contactUsStyle.buttons, { backgroundColor: mediaButtonColors[media?.mediaName] }]}
          onPress={() => handlePress(media)}
        >
          {media?.mediaName === 'Messenger' && <Messenger />}
          {media?.mediaName === 'Whatsapp' && <Whatsapp />}
          <Text style={contactUsStyle.buttonTexts}>{media?.mediaName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ContactUs;
