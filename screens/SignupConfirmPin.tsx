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
} from 'react-native';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

type SignupConfirmPinNav = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

const SignupConfirmPin = () => {
  const navigation = useNavigation<SignupConfirmPinNav>();
  const [pin, setPin] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handlePinChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === 'Backspace' && index > 0 && pin[index] === '') {
      inputs.current[index - 1]?.focus();
    }
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
          topText="اپنے پن کوڈ کی تصدیق کریں"
        >
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPin(!showPin)}
          >
            <MaterialIcons
              name={showPin ? 'visibility' : 'visibility-off'}
              size={width * 0.06}
              color="#20432E"
            />
          </TouchableOpacity>

          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) {
                    inputs.current[index] = ref;
                  }
                }}
                style={styles.pinInput}
                maxLength={1}
                keyboardType="number-pad"
                secureTextEntry={!showPin}
                value={digit}
                onChangeText={(value) => handlePinChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleBackspace(nativeEvent.key, index)
                }
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (pin.some((digit) => digit === '')) {
                alert('براہ کرم مکمل پن درج کریں۔');
                return;
              }
              navigation.navigate('SignupName');
            }}
          >
            <Text style={styles.submitButtonText}>→</Text>
          </TouchableOpacity>
        </Card>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  eyeIcon: {
    alignSelf: 'center',
    marginBottom: height * 0.025,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
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
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.12,
    marginTop: height * -0.029,
  },
});

export default SignupConfirmPin;
