import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

interface FeaturedCardProps {
  property: {
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    isFavorite: boolean;
  };
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ property }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteBtn}>
          <Icon
            name={property.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={property.isFavorite ? '#ff4d4d' : '#ffffff'}
          />
        </TouchableOpacity>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{property.price}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color={colors.darkGrey} />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>
        <View style={styles.specsRow}>
          <View style={styles.spec}>
            <Icon name="bed-outline" size={16} color={colors.orange} />
            <Text style={styles.specText}>{property.beds} Beds</Text>
          </View>
          <View style={styles.spec}>
            <Icon name="water-outline" size={16} color={colors.orange} />
            <Text style={styles.specText}>{property.baths} Baths</Text>
          </View>
          <View style={styles.spec}>
            <Icon name="expand-outline" size={16} color={colors.orange} />
            <Text style={styles.specText}>{property.sqft} sqft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 10,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  priceTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: colors.darkGrey,
    marginLeft: 4,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: 13,
    color: colors.darkGrey,
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default FeaturedCard;
