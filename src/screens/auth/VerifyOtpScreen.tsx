import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const VerifyOtpScreen = ({ navigation, route }: any) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const insets = useSafeAreaInsets();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { width, height } = useWindowDimensions();
  const paddingHorizontal = width * 0.06;
  const imageHeight = height > 800 ? 280 : 240;
  const titleFontSize = width > 400 ? 28 : 24;

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setActiveOtpIndex(index + 1);
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveOtpIndex(index - 1);
    }
  };

  const handleVerify = () => {
    // Navigate to ResetPassword
    navigation.navigate('ResetPassword');
  };

  const handleResend = () => {
    setTimer(30);
    // Add logic to resend OTP
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Image and Back Button Container */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' }}
              style={[styles.topImage, { height: imageHeight }]}
            />
            {/* Top Back Header Overlay */}
            <TouchableOpacity
              style={[
                styles.backBtn, 
                { 
                  marginLeft: paddingHorizontal, 
                  marginTop: Math.max(insets.top, 16)
                }
              ]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={24} color="#161D2F" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { fontSize: titleFontSize, paddingHorizontal }]}>Verify OTP</Text>
          <Text style={[styles.subtitle, { paddingHorizontal }]}>
            We have sent a verification code to your email/phone.
          </Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  activeOtpIndex === index && styles.otpBoxActive,
                  digit ? styles.otpBoxFilled : null,
                ]}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(digit, index);
                    }
                  }}
                  onFocus={() => setActiveOtpIndex(index)}
                />
              </View>
            ))}
          </View>

          {/* Resend Timer */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive code? </Text>
            {timer > 0 ? (
              <Text style={styles.timerText}>Wait {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend Now</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, { marginHorizontal: paddingHorizontal }]}
            onPress={handleVerify}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Verify & Proceed</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    zIndex: 10,
  },
  topImage: {
    width: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontWeight: '700',
    color: '#161D2F',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
  },
  otpBox: {
    width: 60,
    height: 64,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxActive: {
    borderColor: '#161D2F',
  },
  otpBoxFilled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#161D2F',
  },
  otpText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#161D2F',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: '#6B7280',
  },
  timerText: {
    fontSize: 14,
    color: '#161D2F',
    fontWeight: '600',
  },
  resendLink: {
    fontSize: 14,
    color: '#161D2F',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  submitBtn: {
    height: 56,
    backgroundColor: '#161D2F',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerifyOtpScreen;
