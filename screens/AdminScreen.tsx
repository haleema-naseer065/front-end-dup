import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import BackgroundAndLogo from '../components/BackgroundandLogo'; // Import the new component
import HeaderComponent from '../components/header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type IAdminScreen = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const AdminScreen = () => {
  const navigation = useNavigation<IAdminScreen>();
  return (
    <View style={styles.container}>
      {/* Background and Logo */}
      <BackgroundAndLogo />

      {/* Top Icon and Title */}
            <View style={styles.header}>
              <BlurView intensity={10} style={styles.blurredContainer}>
                <Text style={styles.title}>نائٹرو ٹریک</Text>
              </BlurView>
            </View>

      {/* Header Component */}
      <HeaderComponent
        rightIcons={[
            { name: 'home', onPress: () => navigation.navigate('AdminScreen') },
            // { name: 'help-outline', onPress: () =>navigation.navigate('Tutorial') },
            // { name: 'volume-up', onPress: () => console.log('Volume pressed') },
            { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
          ]}
          leftIcons={[
            { name: 'arrow-back', onPress: () => navigation.goBack() },
          ]}
        containerStyle={styles.headerStyle}
      />

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisteredUsersScreen')}>
          <Text style={styles.buttonText}>رجسٹرڈ یوزرز کی تفصیل</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsersActivity1')}>
          <Text style={styles.buttonText}>یوزرز کی ایکٹیویٹی</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.button} onPress={() => console.log('Delete User pressed')}>
          <Text style={styles.buttonText}>یوزر کو ڈیلیٹ کریں</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerStyle: {
    backgroundColor: '#D9D9D9',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.35,
  },
  blurredContainer: {
    backgroundColor: 'rgba(116, 117, 66, 0.5)',
    paddingVertical: height * 0.01, // Adjust based on screen height
    paddingHorizontal: width * 0.05,
    borderRadius: 30,
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.08, // Scaled font size (8% of screen width)
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.3, // Adjust to position buttons below the logo
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 22,
    width: width * 0.79, // Set a fixed width for consistency
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.21,
    marginVertical: height * 0.02,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop:height * -0.07,
    marginBottom: height * 0.12,
  },
  buttonText: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: '#20432E',
    // fontWeight: 'bold',
  },
});

export default AdminScreen;
