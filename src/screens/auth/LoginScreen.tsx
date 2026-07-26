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
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { width, height } = useWindowDimensions();
  const paddingHorizontal = width * 0.06; // 6% of screen width for responsive margins
  const imageHeight = height > 800 ? 280 : 240; // Scale image on taller devices
  const titleFontSize = width > 400 ? 28 : 24;

  const handleLogin = () => {
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
            // Using a nice modern house image as placeholder for the 3D illustration
            style={[styles.topImage, { height: imageHeight }]}
          />

          <Text style={[styles.title, { fontSize: titleFontSize }]}>Welcome Back</Text>

          {/* Tabs: Login / Sign Up */}
          <View style={[styles.tabContainer, { marginHorizontal: paddingHorizontal }]}>
            <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]} activeOpacity={0.9}>
              <Text style={[styles.tabText, styles.tabTextActive]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, styles.tabBtnInactive]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={[styles.tabText, styles.tabTextInactive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

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

          {/* Password Input */}
          <View style={[styles.inputContainer, { marginHorizontal: paddingHorizontal }]}>
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

          {/* Forgot Password */}
          <TouchableOpacity style={[styles.forgotBtn, { marginRight: paddingHorizontal }]} activeOpacity={0.7} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginBtn, { marginHorizontal: paddingHorizontal }]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View style={[styles.orContainer, { marginHorizontal: paddingHorizontal + 16 }]}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orLine} />
          </View>

          {
            Platform.OS === 'ios' && (
              <TouchableOpacity style={[styles.socialBtn, { marginHorizontal: paddingHorizontal }]} activeOpacity={0.7}>
                <Icon name="logo-apple" size={20} color="#000000" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            )
          }

          {/* Social Buttons */}
          <TouchableOpacity style={[styles.socialBtn, { marginHorizontal: paddingHorizontal }]} activeOpacity={0.7}>
            <Icon name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.socialText}>Google</Text>
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
  topImage: {
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontWeight: '700',
    color: '#161D2F',
    textAlign: 'center',
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
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
    marginBottom: 20,
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 13,
    color: '#161D2F',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  loginBtn: {
    height: 56,
    backgroundColor: '#161D2F',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  orText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#161D2F',
    paddingHorizontal: 16,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  }
});

export default LoginScreen;
