import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Card from '../components/Card';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type SignupVerify = StackNavigationProp<RootStackParamList, 'Home'>;
type SignupVerifyRouteProp = RouteProp<RootStackParamList, 'SignupVerify'>;

const { width, height } = Dimensions.get('window');

const SignupVerify: React.FC = () => {
  const navigation = useNavigation<SignupVerify>();
  const route = useRoute<SignupVerifyRouteProp>();
  const { confirmation, phoneNumber } = route.params;

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Ensure only numeric input is accepted
    const numericText = text.replace(/[^0-9]/g, ''); 
  
    const updatedCode = [...code];
    updatedCode[index] = numericText.slice(-1); // Ensure only one digit is stored
    setCode(updatedCode);
  
    // Move to the next input field if a digit is entered
    if (numericText.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace to focus the previous input
    if (key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // const handleBackPress = () => {
  //   navigation.goBack();
  // };

  // const handleSpeakerPress = () => {
  //   console.log('Speaker icon pressed');
  // };

  // Somewhere in your component:
const handleConfirmCode = async () => {
  // 1. Ensure all 6 digits are present
  if (code.length !== 6 || code.some((digit) => digit.trim() === '')) {
    alert('براہ کرم مکمل کوڈ درج کریں۔');
    return;
  }

  // 2. Combine into one string
  const otpCode = code.join('');

  try {
    // 3. Verify with Firebase
    const result = await confirmation.confirm(otpCode);
    console.log('result',result)
    // 4. Success alert
    alert(
      '      `توثیق کامیاب! خوش آمدید: ${result.user?.phoneNumber}`کامیابی',
    );

    // 5. Navigate to the next screen
    navigation.navigate('SignupPin', {
      phoneNumber: phoneNumber, // or fullPhone if you stored that
    });
  } catch (error) {
    console.error('OTP verification failed:', error);
    alert('غلط کوڈ۔ براہ کرم دوبارہ کوشش کریں۔');
  }
};

// In your JSX, wire it up:


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Avoids the keyboard from covering inputs on iOS
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Card
            height={height * 0.35} // Dynamically set card height
            width="90%"
            backgroundColorTop="#3A5F47"
            backgroundColorBottom="#FFFFFF"
            borderRadius={15}
            topText="ایس ایم ایس پر بھیجا گیا کوڈ داخل کریں"
          >
            <View style={styles.codeInputContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[styles.input, { width: width * 0.12, height: height * 0.07 }]} // Responsive input size
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                />
              ))}
            </View>

            <Text style={styles.resendText}>کوڈ ایس ایم ایس پر دوبارہ بھیجیں</Text>

            <TouchableOpacity
              style={[styles.submitButton, { width: width * 0.3, height: height * 0.06 }]}
              onPress={handleConfirmCode}
              // Responsive button size
              // onPress={async () => {
              //   if (code.length !== 6 || code.some((digit) => digit === '')) {
              //     alert('براہ کرم مکمل کوڈ درج کریں۔');
              //     return;
              //   }
              
              //   const otpCode = code.join(''); // Combine all 4 digits into a single string
              
              //   try {
              //     const result = await confirmation.confirm(otpCode);
              //     alert(`توثیق کامیاب! خوش آمدید: ${result.user.phoneNumber}`);
              //     navigation.navigate('SignupPin',{
              //       phoneNumber: phoneNumber,
              //     });
              //   } catch (error) {
              //     console.error('OTP verification failed:', error);
              //     alert('غلط کوڈ۔ براہ کرم دوبارہ کوشش کریں۔');
              //   }
              // }}


              
            >
              <Text style={styles.submitButtonText}>→</Text>
            </TouchableOpacity>
          </Card>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width * 0.045, // Responsive font size
    marginHorizontal: width * 0.015,
    backgroundColor: '#FFF',
  },
  resendText: {
    fontSize: width * 0.04,
    color: '#3A5F47',
    textAlign: 'center',
    marginBottom: height * 0.015,
  },
  submitButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A5F47',
    borderRadius: 25,
  },
  submitButtonText: {
    fontSize: width * 0.12,
    marginTop: height* -0.025,
    color: '#FFF',
  },
  speakerIcon: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.05,
  },
  backIcon: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
});

export default SignupVerify;
