import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export interface IImageSend {
  uri:string,
  fileName:string,
  type:string
}
interface CameraGalleryPickerHookProps {
  onImagePicked: (uri:string) => void;
  navigation: any;
  maizeType:number
}

const useCameraGalleryPicker = ({ onImagePicked, navigation, maizeType }: CameraGalleryPickerHookProps) => {
  // Function for opening the camera
  const openCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      Alert.alert("اجازت درکار ہے", "براہ کرم تصویر لینے کے لیے کیمرہ تک رسائی کی اجازت دیں۔");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImagePicked(result.assets[0]?.uri );
      navigation.navigate('ProcessingScreen',{uri:result.assets[0]?.uri ,
        fileName:result.assets[0]?.fileName,
        type:result?.assets[0]?.type,
        maizeType:maizeType}
      );    
    } else {
      Alert.alert("تصویر کے بغیر کیمرہ بند کیا گیا۔");
    }
  };

  // Function for opening the gallery
  const openGallery = async () => {
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!galleryPermission.granted) {
      Alert.alert("اجازت درکار ہے", "براہ کرم آپ کے میڈیا لائبریری تک رسائی کی اجازت دیں۔");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImagePicked(result.assets[0]?.uri);
        navigation.navigate('ProcessingScreen',{uri:result.assets[0]?.uri ,
          fileName:result.assets[0]?.fileName,
          type:result?.assets[0]?.type,
          maizeType:maizeType}
      );  // Navigate to ProcessingScreen
    } else {
      Alert.alert("آپ نے کوئی تصویر منتخب نہیں کی۔");
    }
  };

  return { openCamera, openGallery };
};

export default useCameraGalleryPicker;
