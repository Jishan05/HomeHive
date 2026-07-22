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
      <View style={styles.imageContainer}>
        <Image source={{ uri: city.image }} style={styles.image} />
        <View style={styles.overlay} />
      </View>
      <Text style={styles.name} numberOfLines={1}>{city.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 76,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.darkGrey,
    textAlign: 'center',
  },
});

export default CityCircleCard;
