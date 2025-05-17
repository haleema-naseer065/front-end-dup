
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Card from "../components/Card";
// import { signInWithPhoneNumber } from "firebase/auth";
// import auth from '@react-native-firebase/auth';

type SignupStartScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const { width, height } = Dimensions.get("window");

const SignupStartScreen = () => {
  const navigation = useNavigation<SignupStartScreenProp>();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmation, setConfirmation] = useState<any>(null);

  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length === 1 && numericText !== "3") return;
    if (numericText.length <= 10) setPhoneNumber(numericText);
  };

    
const sendOTP = async () => {
  // 1. Validate the entered digits
  if (phoneNumber.length < 10) {
    alert("براہ کرم درست فون نمبر درج کریں۔");
    return;
  }

  const fullPhone = `+92${phoneNumber}`;

  try {
    // 2. Trigger the native phone‐auth SMS
    // const confirmationResult = await auth().signInWithPhoneNumber(fullPhone);

    // 3. Store the confirmation object
    // setConfirmation(confirmationResult);

    // 4. Inform the user
    alert("تصدیقی کوڈ ایس ایم ایس کے ذریعے بھیج دیا گیا ہے۔");

    // 5. Navigate to the verification screen
    navigation.navigate("SignupVerify", {
      confirmation: '',
      phoneNumber: fullPhone,
    });
  } catch (error: any) {
    console.error("OTP Error:", error);
    alert("ایس ایم ایس بھیجنے میں ناکامی۔ براہ کرم نمبر چیک کریں۔");
  }
};


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      /> */}
      <Text style={styles.headerText}>نیا اکاؤنٹ بنائیں</Text>
      <Card
        height={280}
        width="80%"
        backgroundColorTop="#3A5F47"
        backgroundColorBottom="#FFFFFF"
        borderRadius={15}
        topText="اپنا فون نمبر درج کریں"
      >
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>PK | +92</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="331 803203"
              placeholderTextColor="#C7C7C7"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={10}
              contextMenuHidden
            />
          </View>
          <TouchableOpacity style={styles.verifyButton} onPress={sendOTP}>
            <Text style={styles.verifyButtonText}>
              تصدیقی کوڈ ایس ایم ایس کے ذریعے بھیجیں
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    paddingHorizontal: width * 0.04,
  },
  headerText: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#3A5F47",
    marginBottom: height * 0.05,
    marginTop: height * -0.05,
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.04,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: height * 0.05,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: width * 0.04,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    height: height * 0.06,
    width: "87%",
    marginBottom: height * 0.04,
  },
  countryCode: {
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    color: "#20462c",
    fontWeight: "600",
    marginRight: width * 0.02,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: width * 0.01,
    fontSize: width * 0.045,
    color: "#3A5F47",
  },
  verifyButton: {
    backgroundColor: "#3A5F47",
    paddingVertical: height * 0.009,
    paddingHorizontal: height * 0.009,
    borderRadius: height * 0.05,
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: width * 0.035,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SignupStartScreen;
