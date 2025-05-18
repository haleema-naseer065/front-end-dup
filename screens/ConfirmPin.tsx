// src/screens/ConfirmPin.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import type { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

type ConfirmPinNav = StackNavigationProp<RootStackParamList, 'ConfirmPin'>;

const { width, height } = Dimensions.get('window');

export default function ConfirmPin() {
  const route = useRoute<RouteProp<RootStackParamList, 'ConfirmPin'>>();
  const { phoneNumber, pin: originalPin } = route.params;
  const navigation = useNavigation<ConfirmPinNav>();

  const [pin, setPin] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handlePinChange = (value: string, idx: number) => {
    if (/[^0-9]/.test(value)) return;
    const next = [...pin];
    next[idx] = value;
    setPin(next);
    if (value && idx < 3) inputs.current[idx + 1]?.focus();
  };

  const handleBackspace = (key: string, idx: number) => {
    if (key === 'Backspace' && idx > 0 && pin[idx] === '') {
      inputs.current[idx - 1]?.focus();
    }
  };

  const submit = () => {
    if (pin.some((d) => d === '')) {
      Alert.alert('خطا', 'براہ کرم پن مکمل کریں۔');
      return;
    }
    const entered = pin.join('');
    if (entered !== originalPin) {
      Alert.alert('پن میل نہیں ہوا', 'آپ کے دونوں پن ایک جیسے نہیں ہیں۔ دوبارہ کوشش کریں۔');
      setPin(['', '', '', '']);
      inputs.current[0]?.focus();
      return;
    }
    // success!
    navigation.replace('SignupName', {
    phoneNumber,
    pin: entered,
    confirmPin: entered,
});

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Card
          height={height * 0.35}
          width="80%"
          backgroundColorTop="#3A5F47"
          borderRadius={10}
          topText="اپنا پن دوبارہ درج کریں"
        >
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPin(!showPin)}>
            <MaterialIcons
              name={showPin ? 'visibility' : 'visibility-off'}
              size={width * 0.06}
              color="#20432E"
            />
          </TouchableOpacity>

          <View style={styles.pinContainer}>
            {pin.map((d, i) => (
              <TextInput
                key={i}
                ref={(r) => (inputs.current[i] = r)}
                style={styles.pinInput}
                maxLength={1}
                keyboardType="number-pad"
                secureTextEntry={!showPin}
                value={d}
                onChangeText={(v) => handlePinChange(v, i)}
                onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, i)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={submit}>
            <Text style={styles.submitButtonText}>→</Text>
          </TouchableOpacity>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E5E5' },
  eyeIcon: { alignSelf: 'center', marginBottom: height * 0.025 },
  pinContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: height * 0.02 },
  pinInput: {
    width: width * 0.12,
    height: width * 0.12,
    marginHorizontal: width * 0.03,
    textAlign: 'center',
    fontSize: width * 0.05,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    backgroundColor: '#EFEFEF',
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: height * 0.01,
    width: width * 0.22,
    height: height * 0.05,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A5F47',
  },
  submitButtonText: { color: '#FFFFFF', fontSize: width * 0.12, marginTop: height * -0.029 },
});
