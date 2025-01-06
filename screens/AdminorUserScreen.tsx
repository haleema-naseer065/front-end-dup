import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import BackgroundAndLogo from '../components/BackgroundandLogo'; // Import the new component
import HeaderComponent from '../components/header';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type AdminOrUserScreen = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const AdminorUserScreen = () => {
  const navigation = useNavigation<AdminOrUserScreen>();
  return (
    <View style={styles.container}>
      {/* Background and Logo */}
      {/* <BackgroundAndLogo /> */}

      {/* Top Icon and Title */}
      {/* <View style={styles.header}>
        <BlurView intensity={10} style={styles.blurredContainer}>
          <Text style={styles.title}>نائٹرو ٹریک</Text>
        </BlurView>
      </View> */}


      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminScreen')}>
          <Text style={styles.buttonText}>ایڈمن کے طور پر لاگ ان کریں</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomTabNavigator')}>
          <Text style={styles.buttonText}>یوزر کے طور پر لاگ ان کریں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  // headerStyle: {
  //   backgroundColor: '#D9D9D9',
  // },
  // header: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: height * 0.35,
  // },
  // blurredContainer: {
  //   backgroundColor: 'rgba(116, 117, 66, 0.5)',
  //   paddingVertical: height * 0.01, // Adjust based on screen height
  //   paddingHorizontal: width * 0.05,
  //   borderRadius: 30,
  //   padding: width * 0.05,
  // },
  // title: {
  //   fontSize: width * 0.08, // Scaled font size (8% of screen width)
  //   fontWeight: 'bold',
  //   color: '#FFF',
  //   textAlign: 'center',
  // },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1, // Adjust to position buttons below the logo
  },
  button: {
    backgroundColor: "rgba(39, 73, 47, 0.8)",
    borderRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.23,
    marginVertical: height * 0.02,
    width: width*0.82,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: 'white',
    // fontWeight: 'bold',
  },
});

export default AdminorUserScreen;
