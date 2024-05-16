// import { useState } from 'react';
// import { View } from 'react-native';
// import { TextInput } from 'react-native-paper';

// interface OTPInputProps {
//   length: number;
//   title?: string;
//   subTitle?: string;
//   setVerifyOtp?: any;
// }

// const OTPInput = ({ length, title, subTitle, setVerifyOtp }: OTPInputProps) => {
//   const [otp, setOTP] = useState<number[]>(Array(length).fill(NaN));
//   setVerifyOtp(otp.join(''));

//   const handleChange = (index: number, value: string) => {
//     if (/^\d$/.test(value)) {
//       const newOTP = [...otp];
//       newOTP[index] = parseInt(value);
//       setOTP(newOTP);

//       if (index < length - 1) {
//         const nextInput = document.getElementById(`otp_${index + 2}`);
//         if (nextInput) nextInput.focus();
//       }
//     } else if (value === '') {
//       const newOTP = [...otp];
//       newOTP[index] = NaN;
//       setOTP(newOTP);

//       if (index > 0) {
//         const prevInput = document.getElementById(`otp_${index}`);
//         if (prevInput) prevInput.focus();
//       }
//     }
//   };

//   return (
//     <View id="otpNumberCounter" style={{ flexDirection: 'row', justifyContent: 'center' }}>
//       {otp.map((value, index) => (
//         <TextInput
//           key={index}
//           //   className={`main-text-color text-[34px] md:text-[45px] font-bold m-2 border h-[70px] md:max-h-[100px] w-[60px] md:max-w-[90px] text-center form-control rounded outline-none ${
//           //     !isNaN(value) ? "focus:border-main-border-color" : ""
//           //   }`
//           // }
//           maxLength={1}
//           value={!isNaN(value) ? value.toString() : ''}
//           onChangeText={(e) => handleChange(index, e)}
//           autoFocus={index === 0}
//           id={`otp_${index + 1}`}
//         />
//       ))}
//     </View>
//   );
// };

// export default OTPInput;

import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface OTPInputProps {
  length: number;
  title?: string;
  subTitle?: string;
  setVerifyOtp?: any;
}

const OTPInput = ({ length, title, subTitle, setVerifyOtp }: OTPInputProps) => {
  const [otp, setOTP] = useState<Array<number>>(Array(length).fill(NaN));
  const inputs = useRef<Array<RNTextInput | null>>([]);

  useEffect(() => {
    setVerifyOtp(otp.join(''));
  }, [otp, setVerifyOtp]);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = parseInt(value);
      setOTP(newOTP);

      if (index < length - 1 && inputs.current[index + 1]) {
        (inputs.current[index + 1] as RNTextInput | null)?.focus();
      }
    } else if (value === '') {
      const newOTP = [...otp];
      newOTP[index] = NaN;
      setOTP(newOTP);

      if (index > 0 && inputs.current[index - 1]) {
        (inputs.current[index - 1] as RNTextInput | null)?.focus();
      }
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {otp.map((value, index) => (
        <PaperTextInput
          keyboardType="numeric"
          key={index}
          ref={(ref: any) => (inputs.current[index] = ref)}
          maxLength={1}
          value={!isNaN(value) ? value.toString() : ''}
          onChangeText={(e) => handleChange(index, e)}
          autoFocus={index === 0}
          style={{
            width: 40,
            height: 40,
            marginHorizontal: 5,
            backgroundColor: '#fff',
          }}
        />
      ))}
    </View>
  );
};

export default OTPInput;
