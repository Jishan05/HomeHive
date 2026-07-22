import React, { useEffect } from 'react';
import { View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Splash.png')}
        style={styles.image}
        resizeMode="cover"
      >
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    bottom: 100,
  },
});

export default SplashScreen;
