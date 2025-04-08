// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
// import Card from '../components/Card'; // Import the card component
// // import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

// type SignupStartScreen = StackNavigationProp<RootStackParamList, 'Home'>;

// const { width, height } = Dimensions.get('window'); // Get screen dimensions

// const SignupStartScreen = () => {
//   const navigation = useNavigation<SignupStartScreen>();

//   // Use state to manage the phone number input
//   const [phoneNumber, setPhoneNumber] = useState<string>('');  // Start with an empty string

//   const handlePhoneChange = (text: string) => {
//     // Replace non-numeric characters with an empty string
//     const numericText = text.replace(/[^0-9]/g, "");

//     if (numericText.length === 1 && numericText !== "3") {
//       return; // Don't allow input if the first digit is not '3'
//     }

//     if (numericText.length <= 10) {
//       setPhoneNumber(numericText);
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       {/* Header */}
//       <Text style={styles.headerText}>نیا اکاؤنٹ بنائیں</Text>

//       {/* Card Section */}
//       <Card
//         height={280}
//         width="80%" // Now supported without errors
//         backgroundColorTop="#3A5F47"
//         backgroundColorBottom="#FFFFFF"
//         borderRadius={15}
//         topText="اپنا فون نمبر درج کریں"
//       >
//         {/* Inside the Card */}
//         <View style={styles.cardContent}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.countryCode}>PK | +92</Text>
//             <TextInput
//               style={styles.phoneInput}
//               placeholder="331 803203"
//               placeholderTextColor="#C7C7C7" // Gray placeholder text
//               keyboardType="number-pad"
//               value={phoneNumber}  // Bind the value to the state
//               onChangeText={handlePhoneChange}  // Update state on text change
//               maxLength={10}  // Ensure no more than 10 digits
//               contextMenuHidden={true} // Disable context menu
//             />
//           </View>
//           <TouchableOpacity style={styles.verifyButton}
//            onPress={() =>
//             {
//               if (phoneNumber.length < 10) {
//                 alert("براہ کرم درست فون نمبر درج کریں۔"); // Display an alert in Urdu
//                 return;
//               }
//               navigation.navigate('SignupVerify');
//             }} >
//             <Text style={styles.verifyButtonText}>
//               تصدیقی کوڈ ایس ایم ایس کے ذریعے بھیجیں
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Card>

//     </KeyboardAvoidingView>
//   );
// };

// // import { Dimensions, StyleSheet } from 'react-native';

// // const { width, height } = Dimensions.get('window'); // Get screen dimensions

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#E5E5E5',
//     paddingHorizontal: width * 0.04, // Adjust padding based on screen width
//   },
//   headerText: {
//     fontSize: width * 0.07, // Responsive font size
//     fontWeight: 'bold',
//     color: '#3A5F47',
//     marginBottom: height * 0.05,
//     marginTop: height * -0.05, // Responsive margin
//     textAlign: 'center',
//   },
//   cardContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: width * 0.04, // Responsive padding
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E8E8E8',
//     borderRadius: height * 0.05, // Responsive border radius
//     overflow: 'hidden',
//     backgroundColor: '#F2F2F2', // Light background color
//     paddingHorizontal: width * 0.04, // Responsive horizontal padding
//     shadowColor: '#000', // Add shadow for depth
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2, // For Android shadow
//     height: height * 0.06, // Responsive height
//     width: '87%',
//     marginBottom: height * 0.04, // Responsive margin
//   },
//   countryCode: {
//     fontSize: width * 0.04, // Responsive font size
//     borderRadius: height * 0.03, // Responsive border radius
//     paddingHorizontal: width * 0.02, // Responsive padding
//     paddingVertical: height * 0.01, // Responsive padding
//     color: '#20462c',
//     fontWeight: '600',
//     marginRight: width * 0.02,
//   },
//   phoneInput: {
//     flex: 1,
//     paddingHorizontal: width * 0.01, // Responsive padding
//     fontSize: width * 0.045, // Responsive font size
//     color: '#3A5F47',
//   },
//   verifyButton: {
//     backgroundColor: '#3A5F47',
//     paddingVertical: height * 0.009, // Responsive vertical padding
//     paddingHorizontal: height * 0.009,
//     borderRadius: height * 0.05, // Responsive border radius
//     width: '65%',
//     alignItems: 'center',
//     justifyContent: 'center', // Center text vertically
//   },
//   verifyButtonText: {
//     color: '#FFFFFF',
//     fontSize: width * 0.035, // Responsive font size
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   speakerIcon: {
//     position: 'absolute', // Ensure it is positioned absolutely
//     top: height * 0.05, // Adjust position from the top of the screen
//     right: width * 0.05, // Adjust position from the right of the screen
//   },
//   backIcon: {
//     position: 'absolute', // Position absolutely
//     top: height * 0.05, // Adjust position from the top of the screen
//     left: width * 0.05, // Adjust position from the left of the screen
//   },
// });

// // export default styles;

// export default SignupStartScreen;

// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { auth } from '../config';
// import { signInWithPhoneNumber } from "firebase/auth";

// export default function PhoneAuth() {
//   const recaptchaVerifier:any = useRef(null);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [confirmation, setConfirmation] = useState(null);

//   // Send OTP
//   const sendOTP = async () => {
//     try {
//       const confirmationResult :any= await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
//       setConfirmation(confirmationResult);
//       alert('OTP sent successfully!');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert('Failed to send OTP. Check the phone number.');
//     }
//   };

//   // Verify OTP
//   const verifyOTP = async () => {
//     try {
//       if (!confirmation) {
//         alert('Please request OTP first.');
//         return;
//       }
//       const userCredential = await confirmation?.confirm(otp) as any;
//       alert(`Phone verified! Welcome, ${userCredential.user.phoneNumber}`);
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       alert('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Invisible reCAPTCHA modal */}
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={auth.app.options}
//       />

//       <Text style={styles.label}>Phone Number:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="+92XXXXXXXXXX"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//       />
//       <Button title="Send OTP" onPress={sendOTP} />

//       <Text style={styles.label}>Enter OTP:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="123456"
//         value={otp}
//         onChangeText={setOtp}
//         keyboardType="number-pad"
//       />
//       <Button title="Verify OTP" onPress={verifyOTP} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//   },
// });

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Card from "../components/Card";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../config"; // your firebase config
import { signInWithPhoneNumber } from "firebase/auth";

type SignupStartScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const { width, height } = Dimensions.get("window");

const SignupStartScreen = () => {
  const navigation = useNavigation<SignupStartScreenProp>();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmation, setConfirmation] = useState<any>(null);

  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length === 1 && numericText !== "3") return;
    if (numericText.length <= 10) setPhoneNumber(numericText);
  };

  const sendOTP = async () => {
    if (phoneNumber.length < 10) {
      alert("براہ کرم درست فون نمبر درج کریں۔");
      return;
    }
    try {
      const fullPhone = "+92" + phoneNumber;
      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        recaptchaVerifier.current as any
      );
      setConfirmation(result);
      alert("تصدیقی کوڈ ایس ایم ایس کے ذریعے بھیج دیا گیا ہے۔");
      navigation.navigate("SignupVerify", { confirmation: confirmation ,
        phoneNumber: '+92' + phoneNumber
       });
    } catch (error) {
      console.error("OTP Error:", error);
      alert("ایس ایم ایس بھیجنے میں ناکامی۔ براہ کرم نمبر چیک کریں۔");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <Text style={styles.headerText}>نیا اکاؤنٹ بنائیں</Text>
      <Card
        height={280}
        width="80%"
        backgroundColorTop="#3A5F47"
        backgroundColorBottom="#FFFFFF"
        borderRadius={15}
        topText="اپنا فون نمبر درج کریں"
      >
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>PK | +92</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="331 803203"
              placeholderTextColor="#C7C7C7"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={10}
              contextMenuHidden
            />
          </View>
          <TouchableOpacity style={styles.verifyButton} onPress={sendOTP}>
            <Text style={styles.verifyButtonText}>
              تصدیقی کوڈ ایس ایم ایس کے ذریعے بھیجیں
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    paddingHorizontal: width * 0.04,
  },
  headerText: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#3A5F47",
    marginBottom: height * 0.05,
    marginTop: height * -0.05,
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.04,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: height * 0.05,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: width * 0.04,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    height: height * 0.06,
    width: "87%",
    marginBottom: height * 0.04,
  },
  countryCode: {
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    color: "#20462c",
    fontWeight: "600",
    marginRight: width * 0.02,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: width * 0.01,
    fontSize: width * 0.045,
    color: "#3A5F47",
  },
  verifyButton: {
    backgroundColor: "#3A5F47",
    paddingVertical: height * 0.009,
    paddingHorizontal: height * 0.009,
    borderRadius: height * 0.05,
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.035,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SignupStartScreen;
