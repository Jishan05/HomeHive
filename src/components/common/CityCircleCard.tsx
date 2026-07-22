import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

interface CityCircleCardProps {
  city: {
    id: string;
    name: string;
    image: string;
  };
}

const CityCircleCard: React.FC<CityCircleCardProps> = ({ city }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.ringWrapper}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: city.image }} style={styles.image} />
          <View style={styles.overlay} />
        </View>
      </View>
      <Text style={styles.name} numberOfLines={1}>{city.name}</Text>
      <Text style={styles.propCount}>120+ Props</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  ringWrapper: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2.5,
    borderColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 30, 54, 0.15)',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navyBlue,
    textAlign: 'center',
  },
  propCount: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 1,
  },
});

export default CityCircleCard;
