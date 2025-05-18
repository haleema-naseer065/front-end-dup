
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute,RouteProp } from '@react-navigation/native';
import HeaderComponent from '../components/header';
import NitroTrackContainer from '../components/NitrotrackandCornImage';
import CameraGalleryPickerLogic from '../components/CameraGalleryImagePicker';  // Import logic component
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ImageSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'imageselection'>;

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const NitrogenEstimationScreen = () => {
  const navigation = useNavigation<ImageSelectionNavigationProp>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'imageselection'>>();
  const {crop_id} = params
  // Get the image picking logic
  const { openCamera, openGallery } = CameraGalleryPickerLogic({
    onImagePicked: (uri: string) => {
      console.log('uri',uri)
    },
    navigation,
    maizeType:crop_id
  });
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent
        rightIcons={[
          { name: 'home', onPress: () => navigation.navigate('BottomTabNavigator') },
          { name: 'help-outline', onPress: () => navigation.navigate('Tutorial') },
          { name: 'volume-up', onPress: () => navigation.navigate('Tutorial') },
          { name: 'exit-to-app', onPress: () => navigation.navigate('StartLogin') },
        ]}
        leftIcons={[{ name: 'arrow-back', onPress: () => navigation.goBack() }]}
      />

      <NitroTrackContainer />

      {/* Image picking buttons */}
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>تصویر لیں</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>پہلے سے لی گئی تصویر منتخب کریں</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  button: {
    // backgroundColor: '#3c643c',
    paddingVertical: height * 0.02,  // Responsive padding based on screen height
    marginVertical: height * 0.015,  // Responsive margin based on screen height
    // borderRadius: 10,
    width: width * 0.8,  // Make the button width 80% of screen width
    alignItems: 'center',

    backgroundColor: "rgba(39, 73, 47, 0.8)",
    // paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: 40,
    // marginVertical: height * 0.02,
    // width: "75%",
    // alignItems: "center",
    marginTop: height * 0.13,
    marginBottom: height * -0.1,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05,  // Adjust font size based on screen width
    // writingDirection: "rtl",
    textAlign: "center",  },
});

export default NitrogenEstimationScreen;






// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Dimensions } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import Svg, { Rect, Circle } from 'react-native-svg';
// import { PanResponder } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const NitrogenEstimationScreen: React.FC = () => {
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [cropArea, setCropArea] = useState({
//     x: 50,
//     y: 50,
//     width: 200,
//     height: 200,
//   });
//   const [rotation, setRotation] = useState(0); // To manage image rotation

//   const openCamera = async () => {
//     // Request camera permissions
//     const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!cameraPermission.granted) {
//       Alert.alert(
//         "اجازت درکار ہے", 
//         "براہ کرم تصویر لینے کے لیے کیمرہ تک رسائی کی اجازت دیں۔"
//       );
//       return;
//     }
  
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       aspect: [1, 1],
//       quality: 1,
//     });
  
//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setImageUri(result.assets[0].uri); // Access the URI from the assets array
//     } else {
//       Alert.alert("کیمرہ بند کر دیا گیا", "تصویر کے بغیر کیمرہ بند کیا گیا۔");
//     }
//   };
  
//   const openGallery = async () => {
//     // Request media library permissions
//     const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!galleryPermission.granted) {
//       Alert.alert(
//         "اجازت درکار ہے", 
//         "براہ کرم آپ کے میڈیا لائبریری تک رسائی کی اجازت دیں۔"
//       );
//       return;
//     }
  
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });
  
//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setImageUri(result.assets[0].uri); // Access the URI from the assets array
//     } else {
//       Alert.alert("کوئی تصویر منتخب نہیں کی گئی", "آپ نے کوئی تصویر منتخب نہیں کی۔");
//     }
//   };

//   // Crop Image
//   const cropImage = async () => {
//     if (!imageUri) return;

//     try {
//       const croppedImage = await ImageManipulator.manipulateAsync(
//         imageUri,
//         [
//           {
//             crop: {
//               originX: cropArea.x,
//               originY: cropArea.y,
//               width: cropArea.width,
//               height: cropArea.height,
//             },
//           },
//           {
//             rotate: rotation, // Rotate the image based on current rotation value
//           }
//         ],
//         { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
//       );
//       setImageUri(croppedImage.uri);
//     } catch (error) {
//       Alert.alert("Error", "Failed to crop the image.");
//     }
//   };

//   // PanResponder for dragging
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       setCropArea((prev) => ({
//         ...prev,
//         x: Math.max(0, prev.x + gestureState.dx),
//         y: Math.max(0, prev.y + gestureState.dy),
//       }));
//     },
//   });

//   // Resize the crop area
//   const resizeCropArea = (dx: number, dy: number, corner: string) => {
//     setCropArea((prev) => {
//       switch (corner) {
//         case 'topLeft':
//           return {
//             ...prev,
//             x: prev.x + dx,
//             y: prev.y + dy,
//             width: prev.width - dx,
//             height: prev.height - dy,
//           };
//         case 'topRight':
//           return {
//             ...prev,
//             y: prev.y + dy,
//             width: prev.width + dx,
//             height: prev.height - dy,
//           };
//         case 'bottomLeft':
//           return {
//             ...prev,
//             x: prev.x + dx,
//             width: prev.width - dx,
//             height: prev.height + dy,
//           };
//         case 'bottomRight':
//           return {
//             ...prev,
//             width: prev.width + dx,
//             height: prev.height + dy,
//           };
//         default:
//           return prev;
//       }
//     });
//   };

//   const createPanResponderForResize = (corner: string) => {
//     return PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         resizeCropArea(gestureState.dx, gestureState.dy, corner);
//       },
//     });
//   };

//   // Rotate the image
//   const rotateImage = () => {
//     setRotation((prevRotation) => (prevRotation + 90) % 360); // Rotate in 90 degree increments
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>نائٹرو ٹریک</Text>
//         <Text style={styles.subHeaderText}>نائٹروجن ایپ</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={openCamera}>
//         <Text style={styles.buttonText}>تصویر لیں</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={openGallery}>
//         <Text style={styles.buttonText}>پہلے سے لی گئی تصویر منتخب کریں</Text>
//       </TouchableOpacity>

//       {imageUri && (
//         <View style={{ position: 'relative' }}>
//           <Image
//             source={{ uri: imageUri }}
//             style={{ width, height: height / 2, transform: [{ rotate: `${rotation}deg` }] }}
//             resizeMode="contain"
//           />
//           <Svg height={height / 2} width={width} style={StyleSheet.absoluteFill}>
//             <Rect
//               x={cropArea.x}
//               y={cropArea.y}
//               width={cropArea.width}
//               height={cropArea.height}
//               stroke="blue"
//               strokeWidth={2}
//               fill="transparent"
//               {...panResponder.panHandlers}
//             />
//             {/* Resize handles */}
//             <Circle
//               cx={cropArea.x}
//               cy={cropArea.y}
//               r={10}
//               fill="red"
//               {...createPanResponderForResize('topLeft').panHandlers}
//             />
//             <Circle
//               cx={cropArea.x + cropArea.width}
//               cy={cropArea.y}
//               r={10}
//               fill="red"
//               {...createPanResponderForResize('topRight').panHandlers}
//             />
//             <Circle
//               cx={cropArea.x}
//               cy={cropArea.y + cropArea.height}
//               r={10}
//               fill="red"
//               {...createPanResponderForResize('bottomLeft').panHandlers}
//             />
//             <Circle
//               cx={cropArea.x + cropArea.width}
//               cy={cropArea.y + cropArea.height}
//               r={10}
//               fill="red"
//               {...createPanResponderForResize('bottomRight').panHandlers}
//             />
//           </Svg>
//         </View>
//       )}

//       <TouchableOpacity style={styles.button} onPress={cropImage}>
//         <Text style={styles.buttonText}>کروپ کریں</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={rotateImage}>
//         <Text style={styles.buttonText}>تصویر گھمائیں</Text>
//       </TouchableOpacity>

//       <View style={styles.navbar}>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>ہوم اسکرین</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>مدد کے لیے یہاں کلک کریں</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>اکاؤنٹ لاگ آؤٹ کریں</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#2c3e50',
//     borderRadius: 10,
//     // marginBottom: 30,
//   },
//   headerText: {
//     fontSize: 24,
//     color: '#fff',
//   },
//   subHeaderText: {
//     fontSize: 18,
//     color: '#fff',
//   },
//   button: {
//     backgroundColor: '#2980b9',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   navbar: {
//     flexDirection: 'row',
//     marginTop: 20,
//     justifyContent: 'space-evenly',
//     width: '100%',
//   },
//   navItem: {
//     backgroundColor: '#34495e',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   navText: {
//     color: '#fff',
//   },
// });

// export default NitrogenEstimationScreen;






// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';  // Importing the image manipulator library

// const NitrogenEstimationScreen: React.FC = () => {
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [isCropping, setIsCropping] = useState(false);  // Track cropping status

//   const openCamera = async () => {
//     const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!cameraPermission.granted) {
//       Alert.alert(
//         "اجازت درکار ہے", 
//         "براہ کرم تصویر لینے کے لیے کیمرہ تک رسائی کی اجازت دیں۔"
//       );
//       return;
//     }

//     // Open the camera and take the image
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       aspect: [1, 1],  // No cropping initially, we will handle that interactively
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       // Start cropping process
//       cropImage(result.assets[0].uri);
//     } else {
//       Alert.alert("کیمرہ بند کر دیا گیا", "تصویر کے بغیر کیمرہ بند کیا گیا۔");
//     }
//   };

//   const openGallery = async () => {
//     const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!galleryPermission.granted) {
//       Alert.alert(
//         "اجازت درکار ہے", 
//         "براہ کرم آپ کے میڈیا لائبریری تک رسائی کی اجازت دیں۔"
//       );
//       return;
//     }

//     // Open the image gallery and pick an image
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false, // No cropping initially
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       // Start cropping process
//       cropImage(result.assets[0].uri);
//     } else {
//       Alert.alert("کوئی تصویر منتخب نہیں کی گئی", "آپ نے کوئی تصویر منتخب نہیں کی۔");
//     }
//   };

//   const cropImage = async (uri: string) => {
//     setIsCropping(true);  // Indicate that cropping is in progress
//     try {
//       // Use expo-image-manipulator to crop the image interactively
//       const result = await ImageManipulator.manipulateAsync(uri, [
//         { resize: { width: 300, height: 300 } },  // Resizing before cropping (optional)
//         { crop: { originX: 50, originY: 50, width: 200, height: 200 } }  // Cropping
//       ]);
      
//       setImageUri(result.uri);  // Set the cropped image URI
//       setIsCropping(false);  // Cropping completed
//     } catch (error) {
//       console.log(error);
//       setIsCropping(false);
//       Alert.alert("کٹائی میں خرابی", "تصویر کٹائی میں خرابی ہو گئی۔");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>نائٹرو ٹریک</Text>
//         <Text style={styles.subHeaderText}>نائٹروجن ایپ</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={openCamera}>
//         <Text style={styles.buttonText}>تصویر لیں</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={openGallery}>
//         <Text style={styles.buttonText}>پہلے سے لی گئی تصویر منتخب کریں</Text>
//       </TouchableOpacity>

//       {isCropping ? (
//         <Text>تصویر کٹائی جا رہی ہے...</Text>
//       ) : imageUri ? (
//         <View style={styles.imageContainer}>
//           <Text>کٹائی گئی تصویر:</Text>
//           <Image source={{ uri: imageUri }} style={styles.croppedImage} />
//         </View>
//       ) : null}

//       <View style={styles.navbar}>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>ہوم اسکرین</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>مدد کے لیے یہاں کلک کریں</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>اکاؤنٹ لاگ آؤٹ کریں</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderColor: '#3c643c',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: 'white',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#3c643c',
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: '#3c643c',
//   },
//   button: {
//     backgroundColor: '#3c643c',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   croppedImage: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: '#3c643c',
//     backgroundColor: '#fff',
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navText: {
//     color: '#3c643c',
//     fontSize: 12,
//   },
// });

// export default NitrogenEstimationScreen;







// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, withSpring, useAnimatedStyle, withDelay } from 'react-native-reanimated';

// const NitrogenEstimationScreen: React.FC = () => {
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [cropRect, setCropRect] = useState({ x: 50, y: 50, width: 200, height: 200 }); // Initial crop area

//   const scale = useSharedValue(1);
//   const offsetX = useSharedValue(0);
//   const offsetY = useSharedValue(0);

//   const openCamera = async () => {
//     // Request camera permissions
//     const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!cameraPermission.granted) {
//       Alert.alert(
//         "اجازت درکار ہے", 
//         "براہ کرم تصویر لینے کے لیے کیمرہ تک رسائی کی اجازت دیں۔"
//       );
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setImageUri(result.assets[0].uri); // Access the URI from the assets array
//     } else {
//       Alert.alert("کیمرہ بند کر دیا گیا", "تصویر کے بغیر کیمرہ بند کیا گیا۔");
//     }
//   };

//   const openGallery = async () => {
//     // Request media library permissions
//     const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!galleryPermission.granted) {
//       Alert.alert(
//         "اجازت درکار ہے", 
//         "براہ کرم آپ کے میڈیا لائبریری تک رسائی کی اجازت دیں۔"
//       );
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setImageUri(result.assets[0].uri); // Access the URI from the assets array
//     } else {
//       Alert.alert("کوئی تصویر منتخب نہیں کی گئی", "آپ نے کوئی تصویر منتخب نہیں کی۔");
//     }
//   };

//   // Pan gesture handler
//   const onPanGestureEvent = (event: any) => {
//     offsetX.value = event.translationX;
//     offsetY.value = event.translationY;
//   };

//   // Pinch gesture handler
//   const onPinchGestureEvent = (event: any) => {
//     scale.value = event.scale;
//   };

//   const handleCrop = async () => {
//     if (!imageUri) return;
  
//     // Ensure cropRect has the correct property names (originX, originY, width, height)
//     const { x, y, width, height } = cropRect;
  
//     // Crop the image using ImageManipulator
//     const { uri } = await ImageManipulator.manipulateAsync(
//       imageUri,
//       [{ crop: { originX: x, originY: y, width, height } }],
//       { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
//     );
  
//     // Set the new cropped image URI and notify the user
//     setImageUri(uri);
//     Alert.alert("تصویر کاٹ دی گئی", "تصویر کو کامیابی سے کاٹ لیا گیا ہے۔");
//   };
  

//   // Animated style for pan and pinch gestures
//   const animatedPanStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: withSpring(offsetX.value) },
//         { translateY: withSpring(offsetY.value) },
//       ],
//     };
//   });

//   const animatedPinchStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: withSpring(scale.value) }],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>نائٹرو ٹریک</Text>
//         <Text style={styles.subHeaderText}>نائٹروجن ایپ</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={openCamera}>
//         <Text style={styles.buttonText}>تصویر لیں</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={openGallery}>
//         <Text style={styles.buttonText}>پہلے سے لی گئی تصویر منتخب کریں</Text>
//       </TouchableOpacity>

//       {imageUri && (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: imageUri }} style={styles.imagePreview} />

//           {/* Interactive Cropping Area */}
//           <PanGestureHandler onGestureEvent={onPanGestureEvent}>
//             <Animated.View
//               style={[styles.cropArea, animatedPanStyle]}
//             >
//               <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
//                 <Animated.View
//                   style={[styles.cropArea, animatedPinchStyle]}
//                 />
//               </PinchGestureHandler>
//             </Animated.View>
//           </PanGestureHandler>

//           <TouchableOpacity style={styles.button} onPress={handleCrop}>
//             <Text style={styles.buttonText}>تصویر کاٹیں</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* <View style={styles.navbar}>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>ہوم اسکرین</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>مدد کے لیے یہاں کلک کریں</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Text style={styles.navText}>اکاؤنٹ لاگ آؤٹ کریں</Text>
//         </TouchableOpacity>
//       </View> */}
//     {/* </View>
//   );
// }; */}

// {/* const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderColor: '#3c643c',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: 'white',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#3c643c',
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: '#3c643c',
//   },
//   button: {
//     backgroundColor: '#3c643c',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80%',
//     height: 300,
//     position: 'relative',
//   },
//   imagePreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   cropArea: {
//     position: 'absolute',
//     borderColor: 'red',
//     borderWidth: 2,
//     top: 50,
//     left: 50,
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: '#3c643c',
//     backgroundColor: '#fff',
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navText: {
//     color: '#3c643c',
//     fontSize: 12,
//   },
// });

// export default NitrogenEstimationScreen; */}
