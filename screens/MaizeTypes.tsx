//without component 
// import React from 'react';
// import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import HeaderComponent from '../components/header';
// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// const { width, height } = Dimensions.get('window');

//   const MaizeTypes = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>(); 
//   return (
//     <View style={styles.container}>

//       {/* Header Component */}
//       <HeaderComponent
//         rightIcons={[
//           { name: 'home', onPress: () => navigation.navigate('Home') },
//           { name: 'help-outline', onPress: () => console.log('Help pressed') },
//           { name: 'volume-up', onPress: () => console.log('Volume pressed') },
//           { name: 'exit-to-app', onPress: () => console.log('Logout pressed') },
//         ]}
//         leftIcons={[
//           { name: 'arrow-back', onPress: () => navigation.goBack() },
//         ]}
//       />

//       {/* Nitro Track and Nitrogen App Text Wrapped in One Rectangle */}
//       <View style={styles.nitroTrackContainer}>
//         <Text style={styles.nitroTrackText}>نائٹرو ٹریک</Text>
//         <Text style={styles.nitrogenAppText}>نائیٹروجن ایپ</Text>
//       </View>

//       {/* Subtitle */}
//       <Text style={styles.subtitle}>زیر کاشت مکئی کی قسم کا انتخاب کریں</Text>

//       {/* Corn Image with Buttons */}
//       <View style={styles.imageContainer}>
//         <ImageBackground
//           source={require("../assets/images/cornBackground.jpeg")}
//           style={styles.imageBackground}
//           resizeMode="cover"
//         >
//           {/* Dark Overlay */}
//           <View style={styles.overlay} />

//           {/* Buttons */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('imageselection')} // Navigate to SimpleMaize screen
//           >
//             <Text style={styles.buttonText}>سادہ</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('imageselection')} // Navigate to HybridMaize screen
//           >
//             <Text style={styles.buttonText}>ہائبرڈ</Text>
//           </TouchableOpacity>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     top:0, // Adjusting for header height
//   },
//   nitroTrackText: {
//     fontSize: width * 0.06, // Responsive font size
//     fontWeight: "bold",
//     color: "#004d00",
//     marginTop: height * 0.002, // Margin top relative to screen height
//     textAlign: "center",
//   },
//   nitrogenAppText: {
//     fontSize: width * 0.03, // Smaller font size for the second text
//     color: "#000000",
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: width * 0.05, // Responsive subtitle font size
//     color: "#004d00",
//     marginVertical: height * 0.12, // Margin relative to screen height
//     textAlign: "center",
//   },

//   nitroTrackContainer: {
//     marginTop: height * 0.13,
//     paddingVertical: height * 0.02,
//     paddingHorizontal: width * 0.06,
//     backgroundColor: "white",
//     borderRadius: 10,
//     width: "50%",
//     height: height * 0.1, // Adjusting container height based on screen height
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#006400",
//   },
//   imageContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: '60%',
//     backgroundColor: '#fff',
//   },
//   imageBackground: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingTop: height * 0.05, // Adjusting top padding based on screen height
//   },
//   button: {
//     backgroundColor: "rgba(39, 73, 47, 0.8)",
//     paddingVertical: height * 0.03, // Vertical padding relative to screen height
//     paddingHorizontal: width * 0.1, // Horizontal padding relative to screen width
//     borderRadius: 50,
//     marginVertical: height * 0.02,
//     width: "75%",
//     alignItems: "center",
//     marginBottom: height * 0.05, // Margin bottom relative to screen height
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: width * 0.05, // Adjust font size based on screen width
//     fontWeight: "bold",
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//   },
// });

// export default MaizeTypes;



// MaizeTypes.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import NitroTrackContainer from '../components/NitrotrackandCornImage'; // Import the new component

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const MaizeTypes = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
        rightIcons={[
          { name: 'home', onPress: () => navigation.navigate('BottomTabNavigator') },
          { name: 'help-outline', onPress: () =>navigation.navigate('Tutorial') },
          { name: 'volume-up', onPress: () => console.log('Volume pressed') },
          { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
        ]}
        leftIcons={[
          { name: 'arrow-back', onPress: () => navigation.goBack() },
        ]}
      />

      {/* NitroTrackContainer */}
      <NitroTrackContainer />

      {/* Subtitle */}
      <Text style={styles.subtitle}>زیر کاشت مکئی کی قسم کا انتخاب کریں</Text> 
 
      {/* Buttons */}
       <View style={styles.buttonContainer}>
       
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('imageselection')}
        >
          <Text style={styles.buttonText}>سادہ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('imageselection')}
        >
          <Text style={styles.buttonText}>ہائبرڈ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    top: 0,
  },
  subtitle: {
    fontSize: width * 0.05,
    color: "#004d00",
    marginVertical: height * 0.35,
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "rgba(39, 73, 47, 0.8)",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: 40,
    marginVertical: height * 0.02,
    width: "75%",
    alignItems: "center",
    marginTop: height * -0.23,
    marginBottom: height * 0.29,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "#FFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default MaizeTypes;
