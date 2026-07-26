import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const paddingHorizontal = width * 0.06;
  const imageHeight = height > 800 ? 280 : 240;
  const titleFontSize = width > 400 ? 28 : 24;

  const handleSendOtp = () => {
    navigation.navigate('VerifyOtp');
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

          <Text style={[styles.title, { fontSize: titleFontSize, paddingHorizontal }]}>Forgot Password</Text>
          <Text style={[styles.subtitle, { paddingHorizontal }]}>
            Enter your email address below and we'll send you an OTP to reset your password.
          </Text>

          {/* Form Inputs */}
          {/* Email Input */}
          <View style={[styles.inputContainer, { marginHorizontal: paddingHorizontal }]}>
            <Text style={styles.floatingLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="abhishekpatelXXX@gmail.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, { marginHorizontal: paddingHorizontal }]}
            onPress={handleSendOtp}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Send OTP</Text>
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
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
    marginTop: 6,
  },
  floatingLabel: {
    position: 'absolute',
    left: 20,
    top: -8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#161D2F',
    zIndex: 1,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    color: '#161D2F',
    padding: 0,
    height: '100%',
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

export default ForgotPasswordScreen;
