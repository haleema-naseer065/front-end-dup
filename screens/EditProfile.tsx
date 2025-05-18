import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EditProfileNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

interface ProfileData {
  name: string;
  phone: string;
  profilePic: string | null;
}

interface ImageOption {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  action: () => void;
}

const { width, height } = Dimensions.get('window'); // Get screen width and height

// Changed the component name to match the export and the name used in StackNavigator
const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    phone: '',
    profilePic: null
  });
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Fetch existing profile data when component mounts
  React.useEffect(() => {
    fetchProfileData();
  }, []);
  
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        return;
      }
      
      const response = await fetch('https://web-production-f3500.up.railway.app/profile/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.name || '',
          phone: data.phone_number || '',
          profilePic: data.profile_picture || null
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = async (useCamera: boolean = false) => {
    try {
      setLoading(true);
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
          });

      if (!result.canceled) {
        setProfileData(prev => ({
          ...prev,
          profilePic: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setLoading(false);
      setShowOptions(false);
    }
  };

  
const handleUpdateProfile = async () => {
  const { name, phone } = profileData;

  // Check if at least one field has been filled
  if (!name.trim() && !phone.trim()) {
    Alert.alert('خرابی', 'براہ کرم کم از کم ایک فیلڈ پر کریں');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert('خرابی', 'صارف کا سیشن ختم ہو گیا ہے۔ دوبارہ لاگ ان کریں۔');
      return;
    }

    // Only include fields that have values in the request body
    const requestBody: any = {};
    
    if (name.trim()) {
      requestBody.name = name.trim();
    }
    
    if (phone.trim()) {
      requestBody.new_phone_number = phone.trim();
    }

    const response = await fetch('https://web-production-f3500.up.railway.app/profile/edit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert(
        'کامیابی',
        'اکاؤنٹ کی تفصیلات کامیابی سے تبدیل ہو گئی ہیں',
        [{ text: 'ٹھیک ہے', onPress: () => navigation.navigate('BottomTabNavigator') }],
        { cancelable: false }
      );
    } else {
      Alert.alert('خرابی', data.error || 'پروفائل اپڈیٹ ناکام');
    }

  } catch (error) {
    console.error("Update Error:", error);
    Alert.alert('خرابی', 'سرور سے جڑنے میں ناکامی');
  }
};


  const imageOptions: ImageOption[] = [
    {
      title: 'کیمرہ سے تصویر لیں',
      icon: 'camera-alt',
      action: () => pickImage(true)
    },
    {
      title: 'گیلری سے تصویر منتخب کریں',
      icon: 'photo-library',
      action: () => pickImage(false)
    },
    {
      title: 'تصویر ہٹائیں',
      icon: 'delete',
      action: () => {
        setProfileData(prev => ({ ...prev, profilePic: null }));
        setShowOptions(false);
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>اپنے اکاؤنٹ کی معلومات تبدیل کریں</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.profilePicSection}>
              <View style={styles.imageContainer}>
                {profileData.profilePic ? (
                  <Image
                    source={{ uri: profileData.profilePic }}
                    style={styles.profileImage}
                  />
                ) : (
                  <MaterialIcons name="person" size={60} color="#9CA3AF" />
                )}
              </View>

              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={() => setShowOptions(true)}
                disabled={loading}
              >
                <MaterialIcons name="camera-alt" size={20} color="white" />
                <Text style={styles.changePhotoText}>تصویر تبدیل کریں</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>نام</Text>
                <TextInput
                  style={styles.input}
                  value={profileData.name}
                  onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
                  placeholder="اپنا نام درج کریں"
                  placeholderTextColor="#9CA3AF"
                  textAlign="right"
                />
                <Text style={styles.helperText}>نام بدلنے کے لیے دوبارہ درج کریں</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>فون نمبر</Text>
                <TextInput
                  style={styles.input}
                  value={profileData.phone}
                  onChangeText={(text) => setProfileData(prev => ({ ...prev, phone: text }))}
                  placeholder="اپنا فون نمبر درج کریں"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  textAlign="right"
                />
                <Text style={styles.helperText}>فون نمبر بدلنے کے لیے دوبارہ درج کریں</Text>
              </View>

              <TouchableOpacity
                style={[styles.updateButton, loading && styles.disabledButton]}
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                <Text style={styles.updateButtonText}>
                  {loading ? 'برائے مہربانی انتظار کریں...' : 'پروفائل اپڈیٹ کریں'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>واپس جائیں</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={showOptions}
          transparent
          animationType="slide"
          onRequestClose={() => setShowOptions(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowOptions(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>تصویر کا انتخاب کریں</Text>
                <TouchableOpacity
                  onPress={() => setShowOptions(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>

              {imageOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    index === imageOptions.length - 1 && styles.lastOption,
                    option.icon === 'delete' && styles.deleteOption
                  ]}
                  onPress={option.action}
                >
                  <MaterialIcons
                    name={option.icon}
                    size={24}
                    color={option.icon === 'delete' ? '#EF4444' : '#374151'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      option.icon === 'delete' && styles.deleteText
                    ]}
                  >
                    {option.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    alignItems: "center",
    padding: height * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#20432E',
    textAlign: 'center',
    marginTop: height * 0.03,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    padding: width * 0.04,
  },
  profilePicSection: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  imageContainer: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(191, 191, 191, 0.85)',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    borderRadius: 8,
    gap: 8,
  },
  changePhotoText: {
    color: '#20432E',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  formContainer: {
    gap: height * 0.02,
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontSize: width * 0.04,
    color: '#374151',
    textAlign: 'right',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: width * 0.04,
    color: '#1F2937',
  },
  helperText: {
    fontSize: width * 0.03,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 3,
  },
  updateButton: {
    backgroundColor: 'rgba(191, 191, 191, 0.85)',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    width: width * 0.45,
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
  updateButtonText: {
    color: '#20432E',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: height * 0.015,
    borderRadius: 10,
    width: width * 0.45,
    marginTop: height * 0.02,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: width * 0.05,
    borderRadius: 10,
    width: width * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#374151',
  },
  closeButton: {
    padding: width * 0.02,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  deleteOption: {
    backgroundColor: '#FEE2E2',
  },
  optionText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.03,
    color: '#374151',
  },
  deleteText: {
    color: '#EF4444',
  },
});

export default EditProfile;