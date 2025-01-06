import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import Card from '../components/Card'; // Import the card component
// import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type SignupStartScreen = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const SignupStartScreen = () => {
  const navigation = useNavigation<SignupStartScreen>();

  // Use state to manage the phone number input
  const [phoneNumber, setPhoneNumber] = useState<string>('');  // Start with an empty string

  const handlePhoneChange = (text: string) => {
    // Replace non-numeric characters with an empty string
    const numericText = text.replace(/[^0-9]/g, "");
  
    if (numericText.length === 1 && numericText !== "3") {
      return; // Don't allow input if the first digit is not '3'
    }
  
    if (numericText.length <= 10) {
      setPhoneNumber(numericText);
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Header */}
      <Text style={styles.headerText}>نیا اکاؤنٹ بنائیں</Text>

      {/* Card Section */}
      <Card
        height={280}
        width="80%" // Now supported without errors
        backgroundColorTop="#3A5F47"
        backgroundColorBottom="#FFFFFF"
        borderRadius={15}
        topText="اپنا فون نمبر درج کریں"
      >
        {/* Inside the Card */}
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>PK | +92</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="331 803203"
              placeholderTextColor="#C7C7C7" // Gray placeholder text
              keyboardType="number-pad"
              value={phoneNumber}  // Bind the value to the state
              onChangeText={handlePhoneChange}  // Update state on text change
              maxLength={10}  // Ensure no more than 10 digits
              contextMenuHidden={true} // Disable context menu
            />
          </View>
          <TouchableOpacity style={styles.verifyButton}
           onPress={() =>
            {
              if (phoneNumber.length < 10) {
                alert("براہ کرم درست فون نمبر درج کریں۔"); // Display an alert in Urdu
                return;
              }
              navigation.navigate('SignupVerify');
            }} >
            <Text style={styles.verifyButtonText}>
              تصدیقی کوڈ ایس ایم ایس کے ذریعے بھیجیں
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

    </KeyboardAvoidingView>
  );
};

// import { Dimensions, StyleSheet } from 'react-native';

// const { width, height } = Dimensions.get('window'); // Get screen dimensions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingHorizontal: width * 0.04, // Adjust padding based on screen width
  },
  headerText: {
    fontSize: width * 0.07, // Responsive font size
    fontWeight: 'bold',
    color: '#3A5F47',
    marginBottom: height * 0.05,
    marginTop: height * -0.05, // Responsive margin
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.04, // Responsive padding
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: height * 0.05, // Responsive border radius
    overflow: 'hidden',
    backgroundColor: '#F2F2F2', // Light background color
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
    shadowColor: '#000', // Add shadow for depth
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
    height: height * 0.06, // Responsive height
    width: '87%',
    marginBottom: height * 0.04, // Responsive margin
  },
  countryCode: {
    fontSize: width * 0.04, // Responsive font size
    borderRadius: height * 0.03, // Responsive border radius
    paddingHorizontal: width * 0.02, // Responsive padding
    paddingVertical: height * 0.01, // Responsive padding
    color: '#20462c',
    fontWeight: '600',
    marginRight: width * 0.02,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: width * 0.01, // Responsive padding
    fontSize: width * 0.045, // Responsive font size
    color: '#3A5F47',
  },
  verifyButton: {
    backgroundColor: '#3A5F47',
    paddingVertical: height * 0.009, // Responsive vertical padding
    paddingHorizontal: height * 0.009,
    borderRadius: height * 0.05, // Responsive border radius
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center', // Center text vertically
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.035, // Responsive font size
    fontWeight: '500',
    textAlign: 'center',
  },
  speakerIcon: {
    position: 'absolute', // Ensure it is positioned absolutely
    top: height * 0.05, // Adjust position from the top of the screen
    right: width * 0.05, // Adjust position from the right of the screen
  },
  backIcon: {
    position: 'absolute', // Position absolutely
    top: height * 0.05, // Adjust position from the top of the screen
    left: width * 0.05, // Adjust position from the left of the screen
  },
});

// export default styles;

export default SignupStartScreen;
