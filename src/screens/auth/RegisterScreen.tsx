import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [agencyCode, setAgencyCode] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showAgencyCode, setShowAgencyCode] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    navigation.navigate('MainTabs');
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
          {/* Top 3D House Image */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' }}
            style={styles.topImage}
          />

          <Text style={styles.title}>Create an Account</Text>

          {/* Tabs: Login / Sign Up */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabBtn, styles.tabBtnInactive]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.tabText, styles.tabTextInactive]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]} activeOpacity={0.9}>
              <Text style={[styles.tabText, styles.tabTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form Inputs */}

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Abhishek Patel"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputContainer}>
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

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="8 1 6082 8XXX"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingLabel}>Password</Text>
            <View style={[styles.inputWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="********"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#161D2F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Agency Code Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.floatingLabel}>Agency Code</Text>
            <View style={[styles.inputWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="********"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showAgencyCode}
                value={agencyCode}
                onChangeText={setAgencyCode}
              />
              <TouchableOpacity onPress={() => setShowAgencyCode(!showAgencyCode)} style={{ padding: 4 }}>
                <Icon name={showAgencyCode ? "eye-outline" : "eye-off-outline"} size={20} color="#161D2F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
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
  topImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    marginBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#161D2F',
    textAlign: 'center',
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  tabBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#161D2F',
  },
  tabBtnInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  tabText: {
    fontSize: 15,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabTextInactive: {
    color: '#161D2F',
    fontWeight: '600',
  },
  inputContainer: {
    marginHorizontal: 24,
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
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterScreen;
