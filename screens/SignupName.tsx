import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Card from '../components/Card'; // Adjust the path to your Card component
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for navigation prop
type SignupNameNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Get screen width and height
const { width, height } = Dimensions.get('window');

const SignupName = () => {
  const navigation = useNavigation<SignupNameNavigationProp>();
  const [name, setName] = useState('');

  const handleSignup = () => {
    // Check if the name field is empty
    if (!name.trim()) {
      alert('براہ کرم اپنا نام درج کریں۔'); // Show an alert if name is empty
      return;
    }

    console.log('Name entered:', name);
    navigation.navigate('StartLogin'); // Navigate to the HomeScreen
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section with Go Back and Speaker icons */}
        <View style={styles.headerContainer}>
          {/* Go Back Icon */}
          {/* <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()} // Navigate back on press
          >
            <MaterialIcons name="arrow-back" size={width * 0.08} color="#20432E" />
          </TouchableOpacity> */}

          {/* Speaker Icon */}
          {/* <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="volume-up" size={width * 0.07} color="#20432E" />
          </TouchableOpacity> */}
        </View>

        <Card
          height={height * 0.35} // Adjust height as a percentage of screen height
          width={width * 0.8} // Adjust width as a percentage of screen width
          backgroundColorTop="#3A5F47" // Green top
          backgroundColorBottom="#FFFFFF" // White bottom
          borderRadius={10}
          style={styles.cardStyle} // Add extra styling if needed
          topIcon={<MaterialIcons name="person" size={50} color="#FFFFFF" />} // Add the person icon here
        >
          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Text: اپنا نام درج کریں */}
            <Text style={styles.promptText}>اپنا نام درج کریں</Text>

            {/* TextInput for name */}
            <TextInput
              style={styles.textInput}
              placeholder="محمد اکرم"
              placeholderTextColor="#A9A9A9" // Light gray placeholder
              value={name}
              onChangeText={setName}
            />

            {/* Submit button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>سائن اپ</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5', // Light gray background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  headerContainer: {
    position: 'absolute',
    top: height * 0.05, // Set it to the top of the screen (5% of the screen height)
    left: width * 0.05, // Padding from the left side
    right: width * 0.05, // Padding from the right side
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10, // Make sure it appears above other components
  },
  iconButton: {
    padding: width * 0.03, // Padding proportional to the screen width
  },
  bottomSection: {
    flex: 3.2, // Adjust bottom section height ratio
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Padding from the left and right side
  },
  promptText: {
    fontSize: width * 0.05, // Font size proportional to screen width
    fontWeight: 'bold',
    color: '#20462c',
    marginBottom: height * 0.02, // Margin proportional to screen height
    textAlign: 'center', // Center-align the text
  },
  textInput: {
    width: '100%',
    height: height * 0.065, // Proportional height for TextInput
    borderColor: '#D3D3D3', // Light gray border
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: width * 0.1, // Padding proportional to screen width
    fontSize: width * 0.04, // Font size proportional to screen width
    textAlign: 'right', // Align text for Urdu
    backgroundColor: '#F0F0F0', // Light gray background color (change as needed)
    marginBottom: height * 0.02, // Margin proportional to screen height
  },
  button: {
    marginTop: height * 0.015, // Margin proportional to screen height
    width: '90%',
    height: height * 0.06, // Proportional height for the button
    paddingHorizontal: width * 0.1, // Padding proportional to screen width
    backgroundColor: '#3A5F47', // Green button
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: width * 0.04, // Font size proportional to screen width
    fontWeight: 'bold',
  },
});

export default SignupName;
