import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RootStackParamList } from '../types';

type ProcessingScreenNavigationProp =
  StackNavigationProp<RootStackParamList, 'ProcessingScreen'>;

const ProcessingScreen = () => {
  const navigation = useNavigation<ProcessingScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProcessingScreen'>>();
  const { uri, type, maizeType } = route.params;
  const token  = useSelector((state: RootState) => state.auth.user?.token) as string;

  const [isLoading, setIsLoading] = useState(true);


const uploadImage = async ({
  uri,
  maizeType,
  token,
}: {
  uri: string;
  maizeType: number;
  token: string;
}) => {
  const fileName = uri.split('/').pop() || 'photo.jpg';
  const fileType = fileName.split('.').pop();

  const formData = new FormData();

  formData.append('image', {
    uri,
    name: fileName,
    type: `image/${fileType || 'jpeg'}`,
  } as any);

  formData.append('crop_id', maizeType.toString());

  try {
    const response = await axios.post(
      'https://web-production-d02c.up.railway.app/upload/',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type manually!
        },
      }
    );

    console.log('✅ Upload success:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('❌ Upload failed:', {
      status: err?.response?.status,
      data: err?.response?.data,
      message: err.message,
    });

    Alert.alert(
      'اپ لوڈ ناکام',
      err?.response?.status === 500
        ? 'سرور کی خرابی۔ براہ کرم بعد میں کوشش کریں۔'
        : 'تصویر بھیجنے میں مسئلہ پیش آیا۔'
    )
  }finally{
      setIsLoading(false)
    }
};

  useEffect(() => {
    if(uri){
    uploadImage({uri,maizeType,token});

    }
  }, [uri]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text style={styles.processingText}>
            عمل جاری ہے، براہ کرم{'\n'}انتظار کریں
          </Text>
          <ActivityIndicator size="large" color="#000" />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  processingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    writingDirection: 'rtl',
  },
});

export default ProcessingScreen;
