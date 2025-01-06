// import React from "react";
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../types'; // Ensure path is correct

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// const HomeScreen = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>(); 

//   const navigateToimageselection = () => {
//     console.log("Navigating to selectimage...");
//     navigation.navigate("MaizeTypes");
//   };

//   const navigateToHistoryDetails = () => {
//     console.log("Navigating to history screen...");
//     navigation.navigate("HistoryDetails");
//   };

  

//   return (
//     <ImageBackground
//       source={require("../assets/images/backgroundCrop.jpg")}
//       style={styles.background}
//     >
//       <View style={styles.topBar}>
//         <TouchableOpacity>
//           <Ionicons name="person-circle" size={30} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <MaterialIcons name="volume-up" size={30} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.logoContainer}>
//         <Image 
//           source={require('../assets/images/cornlogo.jpeg')} 
//           style={styles.logo}
//           accessibilityLabel="Corn Logo" 
//         />
//         <Text style={styles.title}>ناٹرو ٹریک</Text>
//       </View>

//       <View style={styles.buttonContainer}>

//         <TouchableOpacity 
//           style={styles.button} 
//           onPress={navigateToimageselection} >
//           <Text style={styles.buttonText}>اپنی مکئی کی فصل میں نائٹروجن کھاد کی مقدار معلوم کریں</Text>
       
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}  
//          onPress={navigateToHistoryDetails} >
          
//           <Text style={styles.buttonText}>پہلے کیے گئے نائٹروجن کھاد کے حساب کی تفصیل دیکھیں</Text>
//         </TouchableOpacity>

//       </View>
//     </ImageBackground>
//   );
// };

// const commonStyles = {
//   shadowColor: "#000",
//   shadowOpacity: 0.2,
//   shadowRadius: 4,
//   elevation: 2,
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: "cover",
//   },
//   topBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     margin: 10,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     resizeMode: "contain",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 5,
//   },
//   buttonContainer: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   button: {
//     ...commonStyles,
//     backgroundColor: "white",
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 10,
//     width: "90%",
//   },
//   buttonText: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default HomeScreen;





// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { BlurView } from 'expo-blur';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';
// import BackgroundAndLogo from '../components/BackgroundandLogo';

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// const HomeScreen = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>(); 

//   // Handle navigation on button press
//   const handleNitrogenEstimation = () => {
//     navigation.navigate('MaizeTypes'); 
//   };

//   const handleViewHistory = () => {
//     navigation.navigate('HistoryDetails'); 
//   };

//   return (
    
//     <View style={styles.container}>

//       <BackgroundAndLogo />
//       {/* Background image */}
      

//       {/* Top Icon and Title */}
//       <View style={styles.header}>
        
//         {/* Blurred Rectangle */}
//         <BlurView intensity={0} style={styles.blurredContainer}>
//           {/* Main title */}
//           <Text style={styles.title}>نائٹرو ٹریک</Text>
//         </BlurView>
//       </View>

//       {/* First Button */}
//       <TouchableOpacity style={styles.button} onPress={handleNitrogenEstimation}>
//         <Image
//           source={require('../assets/images/sample.jpg')} // Use the nitrogen image URL
//           style={styles.buttonImage}
//         />
//         <Text style={styles.buttonText}>
//           اپنی مکئی کی فصل میں نائٹروجن کھاد کی مقدار معلوم کریں
//         </Text>
//       </TouchableOpacity>

//       {/* Second Button */}
//       <TouchableOpacity style={styles.button} onPress={handleViewHistory}>
//         <Text style={styles.buttonText}>
//           پہلے کئے گئے نائٹروجن کھاد کے حساب کتاب کی تفصیل دیکھیں
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
  
//   header:{
//   }, 

//   blurredContainer: {
//     backgroundColor: 'rgba(116, 117, 66, 0.3)', // Light background with transparency
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 40, // Rounded corners
//     padding: 20, // Padding around text
//     marginTop: 0.50, // Margin to separate from other elements
//     // marginBottom: , 
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#D9D9D9',
//     borderRadius: 20,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     width: '80%',
//     marginBottom:-170,
//     marginTop: 180,
//     // marginVertical:20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 5, // for shadow effect on Android
//   },
//   buttonImage: {
//     width: 60,
//     height: 80,
//     marginRight: 10,
//     marginLeft: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 25,
//     color: '#20432E',
//     textAlign: 'right',
//     flexShrink: 1,
//   },
//   // bottomNav: {
//   //   position: 'absolute',
//   //   bottom: 20,
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-around',
//   //   width: '100%',
//   // },
// });

// export default HomeScreen;



import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import BackgroundAndLogo from '../components/BackgroundandLogo';
import HeaderComponent from '../components/header'; // Import HeaderComponent
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Handle navigation on button press
  const handleNitrogenEstimation = () => {
    navigation.navigate('MaizeTypes');
  };

  const handleViewHistory = () => {
    navigation.navigate('HistoryDetails');
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
  rightIcons={[
    { name: 'person', onPress: () => navigation.navigate('EditProfile') },
    { name: 'volume-up', onPress: () => console.log('Volume pressed') },
    { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
  ]}
  leftIcons={[
    // { name: 'arrow-back', onPress: () => navigation.goBack() },
  ]}
/>


      {/* Background and Logo */}
      <BackgroundAndLogo />

      {/* Top Icon and Title */}
      <View style={styles.header}>
        <BlurView intensity={10} style={styles.blurredContainer}>
          <Text style={styles.title}>نائٹرو ٹریک</Text>
        </BlurView>
      </View>

      {/* Nitrogen Estimation Button */}
      <TouchableOpacity style={styles.button} onPress={handleNitrogenEstimation}>
        <Image
          source={require('../assets/images/sample.jpg')} // Use the nitrogen image
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>
          اپنی مکئی کی فصل میں نائٹروجن کھاد کی مقدار معلوم کریں
        </Text>
      </TouchableOpacity>

      {/* View History Button */}
      <TouchableOpacity style={styles.button} onPress={handleViewHistory}>
        <Text style={styles.buttonText}>
          پہلے کئے گئے نائٹروجن کھاد کے حساب کتاب کی تفصیل دیکھیں
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: height * 0.05, // 5% of screen height
    alignItems: 'center',
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
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.05,
    width: '80%', // Button width is 80% of the screen width
    // marginTop: height * 0.03, // 3% of screen height as margin
    marginBottom: Dimensions.get('window').height * -0.21, // Responsive bottom margin
    marginTop: Dimensions.get('window').height * 0.24, // Responsive top margin
    flexDirection: 'row',
    // alignItems: 'center',
    elevation: 5, // Shadow for Android
  },
  buttonImage: {
    width: width * 0.15, // 15% of screen width
    height: height * 0.1, // 10% of screen height
    marginRight: width * 0.03, // 3% of screen width
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: width * 0.05, // 5% of screen width
    color: '#20432E',
    textAlign: 'right',
    flexShrink: 1,
  },
});
export default HomeScreen;
